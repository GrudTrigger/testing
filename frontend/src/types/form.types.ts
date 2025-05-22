import { z } from 'zod'

export const userSchema = z.object({
    email: z.string().email('Неверный формат email'),
    name: z.string().min(1, 'Имя обязательно'),
})

export type FormData = z.infer<typeof userSchema>