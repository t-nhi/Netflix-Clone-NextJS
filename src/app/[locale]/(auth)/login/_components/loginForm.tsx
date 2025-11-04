'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import BrandInput from '@/components/brand-input'
import { useTranslations } from 'next-intl'
import { LoginBody, LoginBodyType } from '@/utils/validation/auth.validation'
import LoginWithGGButton from '@/app/[locale]/(auth)/login/_components/login-with-GG-Button'

export default function LoginForm() {
    const errorMessageT = useTranslations('errorMessages')
    const loginT = useTranslations('LoginPage')

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody) as Resolver<LoginBodyType>,
        defaultValues: {
            email: '',
            password: '',
            remember: false
        }
    })

    const onSubmit: SubmitHandler<LoginBodyType> = (data) => {
        toast('Login successful (mock)')
        console.log('Form data:', data)
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
                                {formState.errors.email?.message &&
                                    errorMessageT(formState.errors.email.message as 'emailInvalid' | 'emailRequired')}
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
                                {formState.errors.password?.message &&
                                    errorMessageT(
                                        formState.errors.password.message as 'passwordMinLength' | 'passwordRequired'
                                    )}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <Button
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

                <FormField
                    control={form.control}
                    name='remember'
                    render={({ field }) => (
                        <FormItem>
                            <label className='flex items-center gap-2 netflix-sans-regular text-white cursor-pointer'>
                                <input
                                    className='dark:bg-black bg-white checked:bg-gray-400 dark:checked:bg-gray-600 cursor-pointer'
                                    type='checkbox'
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                                {loginT('rememberMe')}
                            </label>
                        </FormItem>
                    )}
                />

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
