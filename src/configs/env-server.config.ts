import z from 'zod';
import {
  envClientCollectionObj,
  envClientSchemaObj,
} from './env-client.config';

export const envServerSchemaObj = {
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_URL_INTERNAL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().trim().min(1),

  NEXTAUTH_GOOGLE_ID: z.string().optional(),
  NEXTAUTH_GOOGLE_SECRET: z.string().optional(),

  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),

  NODE_ENV: z
    .enum(['test', 'development', 'production'])
    .default('development'),
};

const envServerCollectionObj = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

  NEXTAUTH_GOOGLE_ID: process.env.NEXTAUTH_GOOGLE_ID,
  NEXTAUTH_GOOGLE_SECRET: process.env.NEXTAUTH_GOOGLE_SECRET,

  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,

  NODE_ENV: process.env.NODE_ENV,
};

export const envServerSchema = z.object(
  Object.assign(envServerSchemaObj, envClientSchemaObj)
);

const envServerCollection = envServerSchema.safeParse(
  Object.assign(envServerCollectionObj, envClientCollectionObj)
);

if (!envServerCollection.success) {
  console.log('Server env error', envServerCollection.error.issues);
  throw new Error('There is an error with the server environment variables');
}

export const envServer = envServerCollection.data;
