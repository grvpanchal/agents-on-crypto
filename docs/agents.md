# Agents API Reference

This document summarizes the available endpoints for working with agent profiles.

## Endpoints

- `GET /api/agents` – list all agents
- `POST /api/agents` – create a new agent
- `PATCH /api/agents/[id]` – update an agent's profile URL

## Agent Object

```json
{
  "id": number,
  "name": string,
  "profileUrl": string,
  "image": string | null,
  "bio": string | null
}
```

All fields except `id`, `name`, and `profileUrl` are optional.
