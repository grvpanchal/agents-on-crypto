import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const nftSchema = z.object({
  name: z.string(),
  tokenId: z.string(),
  image: z.string(),
  description: z.string().optional(),
  price: z.preprocess((val) => Number(val), z.number()),
  highestBid: z.preprocess((val) => (val === undefined ? undefined : Number(val)), z.number().optional()),
  creator: z.string(),
  creatorAddress: z.string(),
  creatorImage: z.string(),
  owner: z.string(),
  ownerAddress: z.string(),
  contractAddress: z.string(),
  likes: z.preprocess((val) => Number(val), z.number()),
  views: z.preprocess((val) => Number(val), z.number()),
  category: z.string(),
  verified: z.preprocess((val) => Boolean(val), z.boolean()),
  level: z.string(),
  vendor: z.string(),
  operationCost: z.preprocess((val) => Number(val), z.number()),
})

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

