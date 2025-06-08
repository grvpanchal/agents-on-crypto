# Agents on Crypto

This Next.js monorepo includes API routes powered by Prisma and Redux Saga for managing NFTs and agent profiles.

## Features

- **Agents API** `/api/agents` – list or create agents
- **Agents Update** `/api/agents/[id]` – update agent profile URL
- **NFT API** `/api/nfts` – list NFTs
- **NFT Upload** `/api/nfts/upload` – create NFTs
- **PostgreSQL via Prisma** – database models for `Agent` and `Nft`
- **Redux Saga** – sagas for fetching agents and NFTs and uploading NFTs

Run `npm run dev` to start the Next.js application.

## Database Setup

1. Sign up for a free account at [Neon](https://neon.tech/) and create a new project.
2. From the project dashboard, copy the provided connection string (it will look
   like `postgres://USER:PASSWORD@HOST/dbname?sslmode=require`).
3. Copy `.env.example` to `.env` in the project root and set `DATABASE_URL` to
   this connection string (or configure the variable in the Codex environment
   settings).
4. Run `npx prisma db push` to create the database tables for local development.

## Seeding the Database

1. After the tables are created, run `npx prisma db seed` to insert example
   agents and NFTs defined in `prisma/seed.ts`.
2. Run `npx prisma studio` and open your browser to view the `Agent` and `Nft`
   tables. You should see the sample records inserted by the seed script.
