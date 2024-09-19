import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { siteConfig } from '@/config/site'

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url()
    ),
  },
  client: {
    NEXT_PUBLIC_NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_APP_NAME: z.string().default(siteConfig.name),
    NEXT_PUBLIC_THE_MOVIE_DB_API_URL: z.string().url(),
    NEXT_PUBLIC_THE_MOVIE_DB_API_KEY: z.string(),
  },
  runtimeEnv: {
    // server
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    // client
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_THE_MOVIE_DB_API_URL:
      process.env.NEXT_PUBLIC_THE_MOVIE_DB_API_URL,
    NEXT_PUBLIC_THE_MOVIE_DB_API_KEY:
      process.env.NEXT_PUBLIC_THE_MOVIE_DB_API_KEY,
  },
})
