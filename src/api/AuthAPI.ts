import { isAxiosError } from 'axios'
import api from '../lib/axios'
import { UserLoginForm } from '../schema'
import { LoginCredentials, User } from '../types/user'

const API_BASE_URL = 'http://localhost:3000/api'

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = `/auth/login`
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

export const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })

        if (!response.ok) {
            throw new Error('Login failed')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error during login:', error)
        throw error
    }
}

export const logout = async (): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (!response.ok) {
            throw new Error('Logout failed')
        }
    } catch (error) {
        console.error('Error during logout:', error)
        throw error
    } finally {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
}