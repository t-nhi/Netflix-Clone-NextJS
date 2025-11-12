'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import BrandInput from '@/components/brand-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { SessionStorageKeys } from '@/constants/session-storage-keys.enum'
import { SignUpBodySchema, SignUpBodyType } from '@/types/dtos/auth/signUp.dto'
import { useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'
import { LoaderCircle } from 'lucide-react'
import { handleFormError } from '@/utils/handleErrors/handleFormError'
import { getLocaleMessage } from '@/utils/locale.util'
import { useRegisterMutation } from '@/store/services/auth/proxy-auth.services'

export default function RegisterForm() {
    const t = useTranslations('RegformPage')
    const errorMessageT = useTranslations('errorMessages')
    const form = useForm<SignUpBodyType>({
        resolver: zodResolver(SignUpBodySchema),
        defaultValues: {
            email: '',
            password: '',
            token: ''
        }
    })

    const [registerMutate, { isLoading: isRegisterLoading }] = useRegisterMutation()

    const router = useRouter()

    useEffect(() => {
        const emailValue = sessionStorage.getItem(SessionStorageKeys.SIGNUP_EMAIL)
        const tokenValue = sessionStorage.getItem(SessionStorageKeys.TOKEN_EMAIL_VERIFICATION)

        if (!emailValue || !tokenValue) {
            return router.push('/signup')
        }

        form.setValue('email', emailValue)
        form.setValue('token', tokenValue)
    }, [router])

    const onSubmit = async (data: SignUpBodyType) => {
        if (isRegisterLoading) return

        try {
            const response = await registerMutate(data).unwrap()
            console.log('Registration successful:', response)
            sessionStorage.removeItem(SessionStorageKeys.SIGNUP_EMAIL)
            sessionStorage.removeItem(SessionStorageKeys.TOKEN_EMAIL_VERIFICATION)
            router.replace('/')
        } catch (error) {
            console.error('Error registering user:', error)
            handleFormError({
                error,
                setFormError: form.setError
            })
        } finally {
            router.refresh()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field, formState }) => (
                        <FormItem>
                            <FormControl>
                                <BrandInput
                                    label={t('emailLabel')}
                                    type='email'
                                    className='h-14 '
                                    {...field}
                                    disabled
                                />
                            </FormControl>
                            <FormMessage className='text-brand'>
                                {getLocaleMessage(errorMessageT, formState.errors.email?.message)}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field, formState }) => (
                        <FormItem>
                            <FormControl>
                                <BrandInput label={t('passwordLabel')} type='password' className='h-14 ' {...field} />
                            </FormControl>
                            <FormMessage className='text-brand'>
                                {getLocaleMessage(errorMessageT, formState.errors.password?.message)}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <div className='pt-6'>
                    <Button
                        disabled={isRegisterLoading}
                        type='submit'
                        className='w-full h-12 bg-brand hover:bg-brand/90 text-white text-base font-semibold rounded-sm cursor-pointer'
                    >
                        {isRegisterLoading ? <LoaderCircle className='animate-spin size-5' /> : t('continueButton')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
