# AGENTS.md - dcyfr-work

## Project Overview

`dcyfr-work-portal` is a Next.js 15 / React 19 portal for work-focused DCYFR experiences.

## Architecture

- App Router pages: `app/`
- Shared logic: `lib/`
- Static/content data: `data/`

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Working Rules

- Follow the current lightweight app structure instead of introducing extra abstraction layers.
- Keep route and content changes aligned with the existing portal organization.
