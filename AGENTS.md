# AdClinic VIP landing page

## Project goal

Maintain the mobile-first AdClinic VIP landing page. Its main conversion is clicking through to the matching unit's real WhatsApp group invitation. Use only invitations and campaign claims the owner supplied or verified. No placeholder invite, fake scarcity, countdown, testimonials, discounts, or guaranteed clinical result.

## Start here

Read `README.md` for unit configuration, analytics consent, A/B variants, build and deployment. Keep work in this directory. The Vercel project link is in `.vercel/project.json`; it identifies the project/team and is not an authentication token.

## Stack and structure

- Next.js 16 App Router, React 19, TypeScript, static export to `out/`.
- `src/lib/config.ts`: units, invitations, campaign IDs and page variants.
- `src/lib/tracking.ts`: consent-gated GTM, GA4 and Meta event routing.
- `src/components/Landing.tsx`: page content and reusable CTAs.
- `src/app/globals.css`: responsive design, reduced-motion support, safe-area handling.
- `public/images/`: official logo, photography and mandala; do not replace or redraw brand assets without instruction.

## Preserve these behaviors

- Validate a WhatsApp group URL before rendering an active link; never substitute a `wa.me` conversation link.
- Keep each unit's CTAs on that unit's configured invite. A click is not proof of joining the group.
- Do not load analytics until opt-in consent; keep IDs empty unless supplied for this deployment.
- Preserve honest offer terms, accessible focus states, FAQ, mobile sticky CTA and no-horizontal-scroll layout.
- Keep `robots: noindex` until the owner confirms commercial launch/domain details.
- Never put passwords, API tokens, `VERCEL_TOKEN`, private WhatsApp invites or other secrets in source control, prompts, screenshots or `.env.example`.

## Work and deploy

For source changes, run `npm ci`, edit, then `npm run build` and `npm run typecheck`. To deploy, first obtain the account owner's authorization/session on this machine. From this directory run `npx vercel whoami`, then `npx vercel --prod --yes`. Vercel CLI uses `.vercel/project.json`. Do not commit a Vercel access token. On a fresh machine, authenticate with `npx vercel login`; the owner completes browser sign-in.

This Vercel project was initially published with a static folder upload and has no Git repository connection. A commit alone does not publish. Use the CLI command above after edits, then verify the resulting production URL.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
