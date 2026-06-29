# js-2830-turbopack-proxy

Bare Next.js 16 (App Router, Turbopack default) app for verifying issue
[#21713](https://github.com/getsentry/sentry-javascript/issues/21713) / JS-2830 on Vercel:
**`proxy.ts` not instrumented under Turbopack builds.**

No Sentry wired up — add it yourself (`npx @sentry/wizard@latest -i nextjs` or manually),
put your emissions in `proxy.ts`, and deploy.

## Structure

```
proxy.ts              # the proxy (hit /api/probe to trigger it) — add Sentry calls here
app/api/probe/route.ts # route behind the proxy matcher
app/{layout,page}.tsx
next.config.ts        # add withSentryConfig here
```

## Run

```bash
pnpm install
pnpm build && pnpm start      # Turbopack (default Next 16 builder — reproduces the bug)
pnpm build:webpack && pnpm start  # webpack (control)
curl localhost:3000/api/probe
```

## Verify on Vercel

Deploy with the default (Turbopack) build, hit `/api/probe`, and check whether your
proxy emissions arrive. Compare against a webpack build (`build:webpack`) as the control.
