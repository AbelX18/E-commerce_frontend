import axios, { isAxiosError } from "axios";
import { Item } from "../schema/itemSchema";

export async function createItem(formData: Item){
    try {
        const url  = '/item/create'
        const {data} = await axios.post(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function getItems(){
    try {
        const url = '/item'
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        } 
    }
}

export async function getItem(id: number){
    try {
        const url = `/item/${id}`
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function updateItem(id: number, formData:Item) {
    try {
        const url = `/item/${id}`
        const {data} = await axios.patch(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function deleteItem(id:number){
    try {
        const url = `/item/${id}`
        const {data} = await axios.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}