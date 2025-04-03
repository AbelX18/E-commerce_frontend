import axios, { isAxiosError } from "axios";
import { createTicketSchema, statusTicketSchema, totalTicketSchema } from "../schema/ticketSchema";

export async function createTicket(formData: createTicketSchema){
    try {
        const url  = '/ticket/create'
        const {data} = await axios.post(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function getTickets(){
    try {
        const url = '/ticket'
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        } 
    }
}

export async function getTicket(id: number){
    try {
        const url = `/ticket/${id}`
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function changeStatus(id: number, formData:statusTicketSchema) {
    try {
        const url = `/ticket/${id}`
        const {data} = await axios.patch(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}

export async function totalStatus(id: number, formData:totalTicketSchema) {
    try {
        const url = `/ticket/${id}`
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
        const url = `/ticket/${id}`
        const {data} = await axios.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}