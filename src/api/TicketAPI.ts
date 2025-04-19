import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Order } from "../schema/ticketSchema";

export async function cantOrder(status: string) {
    try {
        const url = `ticket/cant/${status}`
        const {data} = await api.get<number>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
        return 0
    }
}

export async function findAllOrder() {
    try {
        const url = `ticket`
        const {data} = await api.get<Order[]>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
        return []
    }
}

export async function completeOrder(id: number){
    try {
        const url = `ticket/${id}`
        const {data} = await api.patch(url,{status:"Completed"})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message){
            throw new Error(error.message)
        }
    }
}