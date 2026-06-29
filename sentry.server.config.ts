import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  sendDefaultPii: true,
  tracesSampleRate: 1.0,

  // Attach local variable values to stack frames
  includeLocalVariables: true,

  enableLogs: true,

  debug: false,
});
