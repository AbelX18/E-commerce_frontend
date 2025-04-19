import { z } from 'zod'

/** Product */
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    categoryId: z.number(),
    category: z.object({
        name: z.string()
    }),
    image: z.string(),
    description: z.string(),
    discount: z.number().min(0).max(100).default(0),
    stock: z.number().min(0).default(0)
})

export type Product = z.infer<typeof ProductSchema>
export type ProductFormData = Pick<Product,'name' | 'price' | 'quantity' | 'categoryId' | 'image' | 'description' | 'discount' | 'stock'>
