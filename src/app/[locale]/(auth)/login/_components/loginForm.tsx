'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import BrandInput from '@/components/brand-input'
import { useTranslations } from 'next-intl'
import LoginWithGGButton from '@/app/[locale]/(auth)/login/_components/login-with-GG-Button'
import { LoginBodySchema, LoginBodyType } from '@/types/dtos/auth/login.dto'
import { handleFormError } from '@/utils/handleErrors/handleFormError'
import { getLocaleMessage } from '@/utils/locale.util'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { isEntityError, isFetchBaseQueryError } from '@/store/utils/errorSafeType'
import { formatFetchBaseQueryErrorMessage } from '@/utils/handleErrors/formatFetchBaseQueryErrorMessage'
import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/store/services/auth/proxy-auth.services'
import { decodeJwt } from '@/utils/jwt.util'
import { JwtPayloadType } from '@/types/common/jwt-payload.type'
import { Role } from '@/constants/role.enum'
import { AdminPaths, CommonPaths, UnauthPaths, UserPaths } from '@/config/routes.config'

interface ErrorAlertType {
    title: string
    description: string
}

export default function LoginForm() {
    const [errorAlert, setErrorAlert] = useState<ErrorAlertType>({ title: '', description: '' })
    const errorMessageT = useTranslations('errorMessages')
    const loginT = useTranslations('LoginPage')

    const router = useRouter()

    const [loginMutate, { isLoading }] = useLoginMutation()

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBodySchema) as Resolver<LoginBodyType>,
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<LoginBodyType> = async (data) => {
        try {
            const response = await loginMutate(data).unwrap()
            const { access_token } = response.data
            const decodedAccessToken = decodeJwt(access_token) as JwtPayloadType

            if (decodedAccessToken.role == Role.ADMIN) {
                router.replace(AdminPaths.DASHBOARD)
            } else {
                router.replace(CommonPaths.MOVIES)
            }
        } catch (error) {
            if (isEntityError(error)) {
                handleFormError({ error, setFormError: form.setError })
            } else if (isFetchBaseQueryError(error)) {
                const errorMessage = formatFetchBaseQueryErrorMessage(error)
                setErrorAlert({
                    title: errorMessage.title,
                    description: errorMessage.description
                })
            }
        } finally {
            router.refresh()
        }
    }

    const onReset = () => {
        setErrorAlert({ title: '', description: '' })
        form.reset()
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={onReset}
                method='POST'
                className='flex flex-col gap-4 p-4 sm:p-6 md:p-8 rounded-lg bg-black/65'
            >
                <h1 className='text-2xl sm:text-3xl text-white font-semibold mb-4 text-center netflix-sans-bold'>
                    {loginT('title')}
                </h1>
                {errorAlert.description && (
                    <Alert variant='destructive'>
                        <AlertCircleIcon />
                        <AlertTitle>{errorAlert.title}.</AlertTitle>
                        <AlertDescription>{errorAlert.description}</AlertDescription>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field, formState }) => (
                        <FormItem className='w-full'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    label={loginT('emailPlaceholder')}
                                    className='w-full h-10 sm:h-12 md:h-14 bg-black/50 text-white placeholder-gray-400'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-500 text-xs sm:text-sm mt-1'>
                                {getLocaleMessage(errorMessageT, formState.errors.email?.message)}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field, formState }) => (
                        <FormItem className='w-full'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    type='password'
                                    label={loginT('passwordPlaceholder')}
                                    className='w-full h-10 sm:h-12 md:h-14 bg-black/50 text-white placeholder-gray-400'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-500 text-xs sm:text-sm mt-1'>
                                {getLocaleMessage(errorMessageT, formState.errors.password?.message)}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <Button
                    disabled={isLoading}
                    type='submit'
                    className='bg-red-600 hover:bg-red-700 text-white font-semibold netflix-sans-bold h-10 w-full px-4 sm:px-6 md:px-8 py-2 transition-colors duration-200 cursor-pointer'
                >
                    {isLoading ? <LoaderCircle className='animate-spin size-5' /> : loginT('signIn')}
                </Button>

                <div className='flex items-center my-4 sm:my-6'>
                    <span className='flex-1 border-t border-gray-600'></span>
                    <span className='mx-2 sm:mx-4 text-gray-400 text-xs sm:text-sm netflix-sans-regular'>
                        {loginT('or')}
                    </span>
                    <span className='flex-1 border-t border-gray-600'></span>
                </div>

                <LoginWithGGButton />

                <p className='text-center'>
                    <Link
                        href={CommonPaths.RESET_PASSWORD}
                        className='text-white netflix-sans-bold hover:underline focus:underline-offset-2 cursor-pointer'
                    >
                        {loginT('forgotPassword')}
                    </Link>
                </p>

                <div className='mt-4 text-center netflix-sans-regular'>
                    <p className='text-white'>
                        {loginT('newToNetflix')}{' '}
                        <Link
                            href={UnauthPaths.REGISTER}
                            className='text-white font-semibold underline hover:text-brand'
                        >
                            {loginT('signUpNow')}
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    )
}
