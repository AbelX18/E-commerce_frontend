import { isAxiosError } from 'axios'
import api from '../lib/axios'
import { UserLoginForm } from '../schema'

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = `/auth/Login`
        const {data} = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function profileUser(){
    try {
        const url = `/auth/profile`
        const {data} = await api.get<string>(url)
        return data 
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.message)
        }
    }
}