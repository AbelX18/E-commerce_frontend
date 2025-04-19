import { z } from "zod"

const TicketSchema = z.object({
    id: z.number(),
    user: z.object({
        name : z.string()
    }),
    items: z.array(z.object({
        product: z.object({
            name: z.string(),
        }),
        quantity: z.number()})
    ),
    status: z.string(),

})

export type Order = z.infer<typeof TicketSchema>