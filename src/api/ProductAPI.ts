import { isAxiosError } from "axios";
import type { Product, ProductFormData } from "../schema/productSchema";
import api from "../lib/axios";

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
    }
}

export async function getFindProduct(id: string){
    try {
        const url = `/products/${id}`
        const {data} = await api.get(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function updateProduct(id: number,formData: ProductFormData){
    try {
        const url = `/products/${id}`
        const {data} = await api.patch(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function deleteProduct(id: number){
    try {
        const url = `/products/${id}`
        const {data} = await api.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}