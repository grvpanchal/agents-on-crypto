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
   this connection string.
4. Run `npx prisma db push` to create the database tables for local development.
