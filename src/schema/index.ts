import { z } from 'zod'

/** Auth & Users */
const authSchema = z.object({
    id: z.number(),
    userName: z.string()
        .min(2,"El nombre de usuario debe de tener al menos 2 caracteres"),
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    role: z.enum(['STAFF', 'BUYER', 'SUPERUSER']),
    current_password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth,'email'| 'password' >
export type Staff = Pick<Auth,'id' | 'userName' | 'email' | 'name' |'role'>
export type BuyerFormData = Pick<Auth,'userName'| 'name' | 'email' | 'password' | 'password_confirmation'>
export type StaffFormData = Pick<Auth,'userName'| 'name' | 'email' | 'password'>
export type UserUpdateFrom = Pick<Auth,'userName'|'name'| 'email'>
export type UpdateCurrentUserPasswordForm = Pick<Auth,'current_password' | 'password' | 'password_confirmation'>