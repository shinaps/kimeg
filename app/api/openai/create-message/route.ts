import { NextResponse } from 'next/server'
import { createPromptForCreateMessage } from '@/lib/utils'
import { post } from '@/lib/openai'
import { getText } from '@/zod/api/openai/create-message'

export async function POST(req: Request): Promise<NextResponse> {
  const requestJson = await req.json()
  const text: string = getText(requestJson)
  const messages = createPromptForCreateMessage(text)

  const message = await post(messages)

  return NextResponse.json(message)
}
