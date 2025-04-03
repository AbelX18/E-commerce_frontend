import { z } from "zod"

const ticketSchema = z.object({
    total: z.number(),
    status: z.string(),
    userId: z.number(),
    createdAt: z.date()
})

export type Ticket = z.infer<typeof ticketSchema>
export type createTicketSchema = Pick<Ticket,'createdAt'| 'status' | 'userId' | 'total'>
export type statusTicketSchema = Pick<Ticket,'status'>
export type totalTicketSchema = Pick<Ticket,'total'>