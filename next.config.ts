import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG ?? '___ORG_SLUG___',
  project: process.env.SENTRY_PROJECT ?? '___PROJECT_SLUG___',

  // Source map upload auth token
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Upload wider set of client source files for better stack trace resolution
  widenClientFileUpload: true,

  // Create a proxy API route to bypass ad-blockers
  tunnelRoute: '/monitoring',

  // Suppress non-CI output
  silent: !process.env.CI,

  // NOTE: webpack-only tree-shaking options are intentionally omitted —
  // this project builds with Turbopack (Next.js 16 default).
});
