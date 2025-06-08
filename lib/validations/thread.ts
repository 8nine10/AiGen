import * as z from 'zod'

export const ThreadValidation = z.object({
  agentName: z.string().min(2),
  description: z.string().min(5),
  category: z.string().min(1),
  price: z.string(),
  aimodel: z.any(),
  instructions: z.string().optional(),
  dependencies: z.string().optional(),
  license: z.string(),
  accountId: z.string(),
});

export const CommentValidation = z.object({
    thread: z.string().min(3, { message: 'Minimum threee charaters'}),
})