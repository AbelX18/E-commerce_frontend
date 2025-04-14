import { Product } from '../types/product';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}; import { isAxiosError } from "axios";
import type { Product, ProductFormData } from "../schema/productSchema";
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