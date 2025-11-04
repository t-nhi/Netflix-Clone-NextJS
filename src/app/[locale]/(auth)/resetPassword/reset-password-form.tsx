'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import BrandInput from '@/components/brand-input'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { ChangePasswordBody, ChangePasswordBodyType } from '@/utils/validation/auth.validation'

export default function ResetPasswordForm() {
    const errorMessageT = useTranslations('errorMessages')
    const resetPasswordT = useTranslations('ResetPasswordPage')

    const form = useForm<ChangePasswordBodyType>({
        resolver: zodResolver(ChangePasswordBody) as Resolver<ChangePasswordBodyType>,
        defaultValues: {
            email: 'ray8120@gmail.com',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit: SubmitHandler<ChangePasswordBodyType> = (data) => {
        toast('Thay đổi mật khẩu thành công (mock)')
        console.log('Form data:', data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-4 p-4 sm:p-6 md:p-8 rounded-none bg-[#f2f2f2] dark:bg-neutral-700/50'
            >
                <h1 className='text-2xl sm:text-3xl text-black dark:text-white font-semibold mb-4 text-center netflix-sans-bold'>
                    {resetPasswordT('title')}
                </h1>

                <FormField
                    control={form.control}
                    name='email'
                    // eslint-disable-next-line no-empty-pattern
                    render={({}) => (
                        <FormItem className='w-full cursor-not-allowed'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    label={'Email'}
                                    value={resetPasswordT('emailLabel', { email: form.getValues('email') })}
                                    className={cn(
                                        'w-full h-10 sm:h-12 md:h-14 rounded-md border px-4 pt-7 pb-4',
                                        'dark:bg-white dark:text-white disabled:bg-gray-300/50 disabled:dark:bg-[#414141]/50',
                                        'bg-black/50 text-black',
                                        'text-sm sm:text-base md:text-lg'
                                    )}
                                    wrapperClassName={cn('[&_label]:dark:text-gray!')}
                                    disabled
                                />
                            </FormControl>
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
                                    label={resetPasswordT('passwordLabel')}
                                    className={cn(
                                        'w-full h-10 sm:h-12 md:h-14 rounded-md border px-4 pt-7 pb-4',
                                        'bg-white text-black placeholder-gray-500',
                                        'dark:bg-black/50 dark:text-white dark:placeholder-white',
                                        'text-sm sm:text-base md:text-lg'
                                    )}
                                    wrapperClassName={cn('[&_label]:dark:text-gray!')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-500 text-xs sm:text-sm mt-1'>
                                {formState.errors.password?.message &&
                                    errorMessageT(
                                        formState.errors.password.message as
                                            | 'passwordMinLength'
                                            | 'passwordRequired'
                                            | 'passwordInvalid'
                                    )}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field, formState }) => (
                        <FormItem className='w-full'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    type='password'
                                    label={resetPasswordT('confirmPasswordLabel')}
                                    className={cn(
                                        'w-full h-10 sm:h-12 md:h-14 rounded-md border px-4 pt-7 pb-4',
                                        'bg-white text-black placeholder-gray-500',
                                        'dark:bg-black/50 dark:text-white dark:placeholder-white',
                                        'text-sm sm:text-base md:text-lg'
                                    )}
                                    wrapperClassName={cn('[&_label]:dark:text-gray!')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-500 text-xs sm:text-sm mt-1'>
                                {formState.errors.confirmPassword?.message && errorMessageT('passwordMismatch')}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button
                    type='submit'
                    className='bg-red-600 hover:bg-red-700 text-white rounded-[4px] font-semibold netflix-sans-bold h-[40px] w-full px-4 sm:px-6 md:px-8 py-2 transition-colors duration-200 cursor-pointer'
                >
                    {resetPasswordT('save')}
                </Button>
                <Button
                    type='button'
                    className='bg-white hover:bg-[#e6e6e6] text-black dark:text-white dark:bg-white/20 dark:hover:bg-white/15 rounded-[4px] font-semibold netflix-sans-bold h-[40px] flex items-center justify-center gap-2 cursor-pointer'
                >
                    {resetPasswordT('cancel')}
                </Button>
            </form>
        </Form>
    )
}
