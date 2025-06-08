import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const nfts = await prisma.nft.findMany()
  return NextResponse.json(nfts)
}

