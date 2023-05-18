import * as z from 'zod'

const responseSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  model: z.string(),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }),
  choices: z.array(
    z.object({
      message: z.object({
        role: z.string(),
        content: z.string(),
      }),
      finish_reason: z.string(),
      index: z.number(),
    }),
  ),
})

export const getMessage = (responseJson: string) => {
  return responseSchema.parse(responseJson).choices[0].message.content
}

export const getPromptTokens = (responseJson: string) => {
  return responseSchema.parse(responseJson).usage.prompt_tokens
}
