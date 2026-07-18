# YouthConnect

YouthConnect is a production-ready GovTech SaaS foundation for managing youth entrepreneurship programs across multiple cities.

## Architecture Overview

- Next.js 15 App Router for the web application
- TypeScript for type safety
- Tailwind CSS for design system styling
- shadcn/ui-inspired primitives in the shared UI package
- next-intl for internationalization
- Turborepo for monorepo orchestration
- pnpm workspaces for dependency isolation

## Folder Structure

- apps/web: main Next.js application
- packages/ui: shared UI primitives and utilities
- packages/shared: shared domain constants and utilities
- packages/config: configuration constants for the platform

## Notes

This scaffold intentionally does not implement business features yet. The goal is to establish a clean foundation for future feature work.
