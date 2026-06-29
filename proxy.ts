import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';

// Next.js 16 proxy (renamed middleware). This is the file that is NOT
// instrumented under Turbopack builds (issue #21713 / JS-2830).
//
// These Sentry emissions are what we're verifying: under a Turbopack build,
// do they reach Sentry in production? Compare against a `build:webpack` control.
export async function proxy(request: NextRequest): Promise<NextResponse> {
  console.log('[proxy] hasClient =', !!Sentry.getClient());
  Sentry.logger.info('proxy hit', {
    path: request.nextUrl.pathname,
    method: request.method,
  });

  Sentry.captureMessage('proxy.ts reached', 'info');

  await Sentry.flush(2000);

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/probe'],
};
