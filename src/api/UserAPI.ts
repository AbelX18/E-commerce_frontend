import { isAxiosError } from "axios";
import { BuyerFormData, Staff, StaffFormData, UpdateCurrentUserPasswordForm, UserUpdateFrom } from "../schema";
import api from "../lib/axios";

type UserAPI={
    formData: UserUpdateFrom
    staffId:  Staff['id']
}

export async function registerStaff(formData : StaffFormData) {
    try {
        const url = '/user/register/staff'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.message)
        }
    }
}

export async function registerBuyer(formData : BuyerFormData) {
    try {
        const url = '/user/register/buyer'
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
        const {data} = await api.get<Staff[]>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
        throw new Error(error.message)
        }
        return []
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

export async function updateStaff({staffId,formData}: UserAPI){  
    try {
        const url= `/user/${staffId}`
        const {data} = await api.patch<UserUpdateFrom>(url,formData)
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

export async function deleteUser(id: number){
    try {
        const url = `/user/${id}`
        const {data} = await api.delete<string>(url)
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.message)
        }
    }
}

