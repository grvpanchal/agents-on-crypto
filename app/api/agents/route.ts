import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const agents = await prisma.agent.findMany()
  return NextResponse.json(agents)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const agent = await prisma.agent.create({ data })
    return NextResponse.json(agent, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 })
  }
}

