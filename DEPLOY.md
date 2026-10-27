# For AI coding tools

Open this directory as the project workspace. Begin by reading `AGENTS.md`, then `README.md`. Work from the existing source rather than recreating the site. Preserve the official visual identity, unit routing, consent behavior, safe disabled state for missing WhatsApp invitations, and private/noindex launch state.

## Publish an edit

1. Make the requested source edit.
2. Install locked dependencies with `npm ci` if needed.
3. Run `npm run build` and `npm run typecheck`.
4. Check the active account with `npx vercel whoami`.
5. Deploy the linked project with `npx vercel --prod --yes`.
6. Open the production URL and confirm it reflects the edit.

The link file `.vercel/project.json` selects the existing Hobby project. It contains identifiers, not credentials. This project started with a Vercel folder upload and is not Git-connected, so `git push` alone will not deploy it.

If the current machine has no Vercel session, run `npx vercel login`; the account owner completes sign-in in their browser. Do not ask the owner to paste credentials into the chat or repository. For owner-managed unattended CI, provide `VERCEL_TOKEN` using the CI/agent's protected secret store and pass it only through the process environment. Never save tokens in project files, source control, generated artifacts or output logs.

Do not change project team, access, billing plan or domain without the owner's explicit request. The current site has no real group invitation or analytics IDs; keep the CTAs disabled until a verified unit invitation is entered by the owner in `src/lib/config.ts`.
