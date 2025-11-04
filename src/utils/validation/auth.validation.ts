import z from 'zod'

export const RegisterEmailBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' })
    })
    .strict()
export type RegisterBodyType = z.infer<typeof RegisterBody>

export type RegisterEmailBodyType = z.infer<typeof RegisterEmailBody>

export const RegisterBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)+$/, { message: 'passwordInvalid' })
    })
    .strict()

export const LoginBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)+$/, { message: 'passwordInvalid' }),
        remember: z.boolean()
    })
    .strict()

export type LoginBodyType = z.infer<typeof LoginBody>

export const ChangePasswordBody = z
    .object({
        email: z.string(),
        password: z.string().min(8, { message: 'passwordMinLength' }),
        confirmPassword: z.string().min(1, { message: 'passwordRequired' })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'passwordMismatch',
        path: ['confirmPassword']
    })
    .strict()
export type ChangePasswordBodyType = z.infer<typeof ChangePasswordBody>
export const PasswordChangeBody = z
    .object({
        current_password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)+$/, { message: 'passwordInvalid' }),
        new_password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)+$/, { message: 'passwordInvalid' }),
        confirm_password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)+$/, { message: 'passwordInvalid' }),
        sign_out_devices: z.boolean()
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: 'passwordMismatch',
        path: ['confirm_password']
    })
    .strict()

export type PasswordChangeBodyType = z.infer<typeof PasswordChangeBody>
