import { getMessage, getPromptTokens } from '@/zod/api/openai/common'

const apiKey = process.env.OPENAI_API_KEY

export const post = async (messages: Prompt) => {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    // @ts-ignore
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: messages,
    }),
    next: { revalidate: 3600 },
  })

  const responseJson = await res.json()
  const message = getMessage(responseJson)
  const promptTokens = getPromptTokens(responseJson)
  console.log(`promptTokens: ${promptTokens}`)
  console.log(`message: ${message}`)
  return message
}
