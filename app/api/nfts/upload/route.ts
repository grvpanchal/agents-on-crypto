import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const nft = await prisma.nft.create({ data })
    return NextResponse.json(nft, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to upload NFT' }, { status: 500 })
  }
}

