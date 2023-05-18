import * as z from 'zod'

const requestBodySchema = z.object({
  text: z.string(),
})
export const getText = (requestJson: string) => requestBodySchema.parse(requestJson).text
