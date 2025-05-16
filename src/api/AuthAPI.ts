import { isAxiosError } from 'axios'
import api from '../lib/axios'
import { UserLoginForm } from '../schema'
import { User } from '../types/user' 

export async function login(formData: UserLoginForm) {
    try {
        const url = '/auth/login'
        const {data} = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function profileUser(): Promise<User>{
    try {
        const url = `/auth/profile`
        const {data} = await api.get<User>(url)
        return data 
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.message)
        }
        throw new Error('Failed to fetch user profile')
    }
}


export const logout = async (): Promise<void> => {
    localStorage.removeItem('AUTH_TOKEN')
    localStorage.removeItem('user')
    
}