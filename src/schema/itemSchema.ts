import { z } from 'zod'

const itemSchema = z.object({
    ticketId: z.number(),
    productId: z.number(),
    quantity: z.number(),
    price: z.number()
})

export type Item = z.infer<typeof itemSchema>