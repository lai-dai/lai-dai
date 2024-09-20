import { NextResponse } from 'next/server'

import { ResFindOne } from '@/lib/types/common'
import { apiServer } from '@/lib/api-server'
import { QUERY_KEYS } from '@/lib/constants/query-key'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const res = await apiServer.post<
      ResFindOne<{
        count: number
        ids: number[]
      }>
    >(QUERY_KEYS.createManyPartOfSpeech, body, {
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
      },
    })

    return NextResponse.json({
      status: false,
      message: (res as any)?.message || 'Success',
      data: res?.data || null,
      meta: res?.meta || {},
    })
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: (error as Error)?.message || 'Error',
      data: null,
    })
  }
}
