import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Category, CategoryForm } from "../schema/categorySchema"

type CategoryAPI = {
    formData: CategoryForm
    id: Category['id']
}

export async function createCategory(formData: CategoryForm) {
    try {
        const url = '/categories/create'
        const {data} = await api.post<string>(url, formData)
        return data 
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function getAllCategories(): Promise<Category[]> {
    try {
        const url = '/categories'
        const { data } = await api.get<Category[]>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
        return []
    }
}

export async function updateCategory({formData, id}: CategoryAPI) {
    try {
        const url = `/categories/${id}`
        const {data} = await api.patch<Category>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }    
}
// Para testear
export async function getCategoryById(id: number): Promise<Category | null> {
    try {
        const url = `/categories/${id}`
        const { data } = await api.get<Category>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.message)
        }
        return null
    }
}