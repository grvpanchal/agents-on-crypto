import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
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

    // Remove client-supplied id field to prevent unique constraint failures
    const { id: _ignored, ...withoutId } = body as Record<string, unknown>

    const parsed = nftSchema.safeParse(withoutId)


    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid NFT data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }


    const nft = await prisma.nft.create({
      data: parsed.data as Prisma.NftUncheckedCreateInput,
    })
    return NextResponse.json(nft, { status: 201 })
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'NFT with the provided id already exists' },
        { status: 409 }
      )
    }
    console.error('NFT upload error', err)
    return NextResponse.json({ error: 'Failed to upload NFT' }, { status: 500 })
  }
}

