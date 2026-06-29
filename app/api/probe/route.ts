import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

// Route sitting behind the proxy matcher — hitting it triggers proxy.ts.
export function GET(): NextResponse {
  Sentry.logger.info('handler hit');
  Sentry.captureMessage('handler reached', 'info');

  return NextResponse.json({ ok: true });
}
