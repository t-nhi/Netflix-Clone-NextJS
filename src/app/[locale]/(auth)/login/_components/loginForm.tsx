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
import { useLoginMutation } from '@/store/services/auth.services'
import { handleFormError } from '@/utils/handleErrors/handleFormError'
import { getLocaleMessage } from '@/utils/locale.util'

export default function LoginForm() {
    const errorMessageT = useTranslations('errorMessages')
    const loginT = useTranslations('LoginPage')
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
            await loginMutate(data).unwrap()
        } catch (error) {
            handleFormError({ error, setFormError: form.setError })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-4 p-4 sm:p-6 md:p-8 rounded-lg bg-black/65'
            >
                <h1 className='text-2xl sm:text-3xl text-white font-semibold mb-4 text-center netflix-sans-bold'>
                    {loginT('title')}
                </h1>

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
                    className='bg-red-600 hover:bg-red-700 text-white font-semibold netflix-sans-bold h-[40px] w-full px-4 sm:px-6 md:px-8 py-2 transition-colors duration-200 cursor-pointer'
                >
                    {loginT('signIn')}
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
                        href='/forgotPassword'
                        className='text-white netflix-sans-bold hover:underline focus:underline-offset-2 cursor-pointer'
                    >
                        {loginT('forgotPassword')}
                    </Link>
                </p>

                <div className='mt-4 text-center netflix-sans-regular'>
                    <p className='text-white'>
                        {loginT('newToNetflix')}{' '}
                        <Link
                            href='/register'
                            className='text-white font-semibold netflix-sans-bold underline hover:text-brand'
                        >
                            {loginT('signUpNow')}
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    )
}
