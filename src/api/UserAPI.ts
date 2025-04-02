import { isAxiosError } from "axios";
import { BuyerRegisterForm, StaffRegisterForm, UpdateCurrentUserPasswordForm, UserUpdateFrom } from "../schema";
import api from "../lib/axios";

export async function registerStaff(formData : StaffRegisterForm) {
    try {
        const url = '/user/create'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.message)
        }
    }
}

export async function registerBuyer(formData : BuyerRegisterForm) {
    try {
        const url = '/user/create'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.message)
        }
    }
}

export async function findAllUsers(){
    try {
        const url= '/user'
        const {data} = await api.get<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
        throw new Error(error.message)
        }
    }
}

export async function findUser(username : string) {
    try {
        const url= `/user/${username}`
        const {data} = await api.get<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.message)
        }
    }
}

export async function updateBuyer(id: number, formData: UserUpdateFrom){
    try {
        const url= `/user/${id}`
        const {data} = await api.patch<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.message)
        }
    }
}

export async function updateStaff(id: number ,formData: UserUpdateFrom){  
    try {
        const url= `/user/${id}`
        const {data} = await api.patch<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.message)
        }
    }
}

export async function changePassword(id: number, formData: UpdateCurrentUserPasswordForm){
    try {
        const url = `/user/${id}`
        const {data} = await api.patch<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.message)
        }
    }
}

