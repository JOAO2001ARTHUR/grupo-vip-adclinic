# AdClinic VIP project context

Start with `AGENTS.md` for required behavior and `DEPLOY.md` for deployment. Use this folder as the project root. The matching Vercel project details are in `.vercel/project.json`; it contains identifiers only. Never put Vercel, WhatsApp, analytics or account secrets in files, prompts, commits or logs. The Vercel project began as a folder upload and is not Git-connected, so edits require a deployment: `npm run build`, then `npm run deploy:vercel` after the account owner authenticates the CLI. See `README.md` for configuration details.
