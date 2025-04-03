import { z } from 'zod'

/** Product */
const ProductSchema = z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    categoryId: z.number(),
    image: z.string(),
    description: z.string()
})

export type Product = z.infer<typeof ProductSchema>
// export type createProduct = Pick<Product,'name' | 'price' | 'quantity' | 'categoryId' | 'image' | 'description'>
// export type updateProduct = Pick<Product,'name' | 'price' | 'quantity' | 'categoryId' | 'description' |'image'> 