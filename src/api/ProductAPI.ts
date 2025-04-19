import { ProductSchema, type Product, type ProductFormData } from "../schema/productSchema";
import api from "../lib/axios";
import { isAxiosError } from "axios";

type ProductAPI={
    formData: ProductFormData
    productId: Product['id']
}

type ProductFilters = {
    sortBy?: 'newest' | 'discount'
    limit?: number
}

export async function createProduct(formData: ProductFormData) {
    try {
        const url = '/products/create'
        const {data} = await api.post<string>(url, formData)
        return data 
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function getAllProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
        const url = '/products'
        const { data } = await api.get<Product[]>(url)
        
        let filteredProducts = [...data]

        // Aplican3 filtros -- test
        if (filters) {
            if (filters.sortBy === 'newest') {
                filteredProducts.sort((a, b) => {
                    const dateA = new Date(a.createdAt || 0)
                    const dateB = new Date(b.createdAt || 0)
                    return dateB.getTime() - dateA.getTime()
                })
            } else if (filters.sortBy === 'discount') {
                filteredProducts = filteredProducts.filter(product => product.discount > 0)
                filteredProducts.sort((a, b) => b.discount - a.discount)
            }

            if (filters.limit) {
                filteredProducts = filteredProducts.slice(0, filters.limit)
            }
        }

        return filteredProducts
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
        return []
    }
}

export async function findProduct({productId}: Pick<ProductAPI,'productId'>){
    try {
        const url = `/products/${productId}`
        const {data} = await api.get<Product>(url)
        const response = ProductSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function updateProduct({productId,formData}: Pick<ProductAPI,'productId'| 'formData' >){
    try {
        const url = `/products/${productId}`
        const {data} = await api.patch<Product>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function deleteProduct({productId}: Pick<ProductAPI,'productId'>){
    try {
        const url = `/products/${productId}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function getProducts(): Promise<Product[]> {
    try {
        const url = '/products'
        const { data } = await api.get<Product[]>(url)
        return data
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}