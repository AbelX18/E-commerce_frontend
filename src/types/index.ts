import { z } from 'zod'

/** Auth & Users */
const authSchema = z.object({
    username: z.string(),
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth,'username'| 'password' >