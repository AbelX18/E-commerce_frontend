import { isAxiosError } from "axios";
import { ProductSchema, type Product, type ProductFormData } from "../schema/productSchema";
import api from "../lib/axios";

type ProductAPI={
    formData: ProductFormData
    productId: Product['id']
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

export async function getAllProducts() {
    try {
        const url = '/products'
        const { data } = await api.get<Product[]>(url)
        return data
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