
import { isAxiosError } from 'axios'
import api from '../lib/axios'
import { UserLoginForm } from '../types'

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = `/auth/Login`
        console.log(formData)
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}