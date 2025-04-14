import { z } from "zod";

const CategorySchema = z.object({
    id: z.number(),
    name: z.string()})

export type Category = z.infer<typeof CategorySchema>
export type CategoryForm = Pick<Category,'name'>