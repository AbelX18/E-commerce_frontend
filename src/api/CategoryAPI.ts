import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Category } from "../schema/categorySchema"

export async function createCategory(formData: Category) {
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