import { NextResponse } from 'next/server'
import { createPromptForGetPlaceholder } from '@/lib/utils'
import { post } from '@/lib/openai'

export async function GET(): Promise<NextResponse> {
  const messages = createPromptForGetPlaceholder()

  const message = await post(messages)

  return NextResponse.json(message)
}
