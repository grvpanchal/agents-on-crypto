import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const activities = await prisma.activity.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(activities)
}
