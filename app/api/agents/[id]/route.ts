import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const agent = await prisma.agent.update({
      where: { id: Number(params.id) },
      data: { profileUrl: data.profileUrl },
    })
    return NextResponse.json(agent)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 })
  }
}

