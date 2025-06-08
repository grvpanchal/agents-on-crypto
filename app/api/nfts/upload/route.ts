import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const nftSchema = z
  .object({
    name: z.string(),
    tokenId: z.string(),
    image: z.string(),
    description: z.string().optional(),
    price: z.coerce.number(),
    highestBid: z.coerce.number().optional(),
    creator: z.string(),
    creatorAddress: z.string(),
    creatorImage: z.string(),
    owner: z.string(),
    ownerAddress: z.string(),
    contractAddress: z.string(),
    likes: z.coerce.number(),
    views: z.coerce.number(),
    category: z.string(),
    verified: z.coerce.boolean(),
    level: z.string(),
    vendor: z.string(),
    operationCost: z.coerce.number(),
  })
  .strict()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = nftSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid NFT data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const nft = await prisma.nft.create({ data: parsed.data })
    return NextResponse.json(nft, { status: 201 })
  } catch (err) {
    console.error('NFT upload error', err)
    return NextResponse.json({ error: 'Failed to upload NFT' }, { status: 500 })
  }
}

