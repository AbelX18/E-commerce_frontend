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
    description: z.string()
})

export type Product = z.infer<typeof ProductSchema>
export type ProductFormData = Pick<Product,'name' | 'price' | 'quantity' | 'categoryId' | 'image' | 'description'>
// export type updateProduct = Pick<Product,'name' | 'price' | 'quantity' | 'categoryId' | 'description' |'image'> 