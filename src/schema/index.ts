import { z } from 'zod'

/** Auth & Users */
const authSchema = z.object({
    userName: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['STAFF', 'BUYER', 'SUPERUSER']),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth,'userName'| 'password' >
export type BuyerRegisterForm = Pick<Auth,'userName'| 'name' | 'email' | 'password' | 'password_confirmation'>
export type StaffRegisterForm = Pick<Auth,'userName'| 'name' | 'email' | 'password'>
export type UserUpdateFrom = Pick<Auth,'userName'|'name'| 'email'>
export type UpdateCurrentUserPasswordForm = Pick<Auth,'current_password' | 'password' | 'password_confirmation'>