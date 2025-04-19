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

export async function getAllCategories() {
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
        const url = `/categories/by-id/${id}`
        const {data} = await api.patch<Category>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }    
}

export async function cantCategory() {
    try {
        const url = '/categories/cant'
        const {data} = await api.get<number>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
        return 0
    }
}