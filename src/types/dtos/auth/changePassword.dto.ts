import { HttpResponseSchema } from '@/types/common/http-response.type'
import z from 'zod'

export const changePasswordBodySchema = z
    .object({
        old_password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, { message: 'passwordInvalid' }),
        new_password: z
            .string()
            .min(1, { message: 'newPasswordRequired' })
            .min(8, { message: 'newPasswordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, { message: 'passwordInvalid' }),
        new_password_confirmation: z
            .string()
            .min(1, { message: 'newPasswordConfirmationRequired' })
            .min(8, { message: 'newPasswordConfirmationMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, { message: 'passwordInvalid' })
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
        message: 'passwordMismatch',
        path: ['new_password_confirmation']
    })
    .strict()

export type ChangePasswordBodyType = z.infer<typeof changePasswordBodySchema>

export const changePasswordResSchema = HttpResponseSchema
export type ChangePasswordResType = z.infer<typeof changePasswordResSchema>
