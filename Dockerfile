ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat git \
  && npm install -g corepack \
  && corepack enable

# Install dependencies only when needed
FROM base AS deps

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# Rebuild the source code only when needed
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner

ENV PORT=3000 \
  HOSTNAME="0.0.0.0"

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && chmod -R 777 /app/public \
  # Set the correct permission for prerender cache
  && mkdir .next \
  && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs .env.local /app/.env.local

USER nextjs

EXPOSE ${PORT}

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
