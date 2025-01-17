// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { envServer } from "@/configs/env-server.config";
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: envServer.NEXT_PUBLIC_SENTRY_DSN ?? "",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: envServer.NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE ?? 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
