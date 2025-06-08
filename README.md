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
