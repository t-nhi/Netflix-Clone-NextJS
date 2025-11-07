'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import BrandInput from '@/components/brand-input'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { ResetPasswordBodySchema, ResetPasswordBodyType } from '@/types/dtos/auth/resetPassword.dto'
import { getLocaleMessage } from '@/utils/locale.util'
import { useState, useEffect } from 'react'
import { useForgotPasswordMutation, useResetPasswordMutation } from '@/store/services/auth.services'
import { handleFormError } from '@/utils/handleErrors/handleFormError'
import { AlertCircleIcon, LoaderCircle } from 'lucide-react'
import { HttpMethod } from '@/constants/http.enum'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { formatFetchBaseQueryErrorMessage } from '@/utils/handleErrors/formatFetchBaseQueryErrorMessage'
import { isEntityError, isFetchBaseQueryError } from '@/store/utils/errorSafeType'
import { toast } from 'sonner'

interface ErrorAlertType {
    title: string
    description: string
}

export default function ResetPasswordForm() {
    const [errorAlert, setErrorAlert] = useState<ErrorAlertType>({ title: '', description: '' })

    const errorMessageT = useTranslations('errorMessages')
    const resetPasswordT = useTranslations('ResetPasswordPage')
    const [resetPasswordMutate, { isLoading: isResetPasswordLoading }] = useResetPasswordMutation()
    const [forgotPasswordMutate, { isLoading: isForgotPasswordLoading }] = useForgotPasswordMutation()

    const [countdown, setCountdown] = useState<number>(0)

    const form = useForm<ResetPasswordBodyType>({
        resolver: zodResolver(ResetPasswordBodySchema),
        defaultValues: {
            email: '',
            new_password: '',
            otp: ''
        }
    })

    const emailValue = form.watch('email')
    const isPageLoading = isResetPasswordLoading || isForgotPasswordLoading
    const isCanSendOTP = !!emailValue && !isPageLoading && countdown == 0

    useEffect(() => {
        if (countdown <= 0) return
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [countdown])

    const onReset = () => {
        setErrorAlert({ title: '', description: '' })
        form.reset()
    }

    const handleSendOTP = async () => {
        if (!isCanSendOTP) return
        try {
            await forgotPasswordMutate({ email: emailValue }).unwrap()
        } catch (error) {
            console.error('Error sending OTP:', error)
            handleFormError({
                error,
                setFormError: form.setError
            })
        } finally {
            setCountdown(120)
        }
    }

    const onSubmit: SubmitHandler<ResetPasswordBodyType> = async (data) => {
        try {
            const result = await resetPasswordMutate(data).unwrap()
            toast.success(result.message)
            onReset()
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
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={onReset}
                className='flex flex-col gap-4 p-4'
                method={HttpMethod.POST}
            >
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
                        <FormItem className='w-full cursor-not-allowed'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    label={'Email'}
                                    className={cn(
                                        'w-full h-10 sm:h-12 md:h-14 rounded-md border-none px-4 pt-7 pb-4',
                                        'bg-white text-black placeholder-gray-500',
                                        'dark:bg-black/50 dark:text-white dark:placeholder-white',
                                        'text-sm sm:text-base md:text-lg'
                                    )}
                                    wrapperClassName={cn('[&_label]:dark:text-gray!')}
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
                    name='otp'
                    render={({ field, formState }) => (
                        <FormItem className='w-full'>
                            <div className='flex items-center gap-4'>
                                <FormControl className='flex-1'>
                                    <BrandInput
                                        type='tel'
                                        label={resetPasswordT('otpLabel')}
                                        className={cn(
                                            'w-full h-10 sm:h-12 md:h-14 rounded-md border-none px-4 pt-7 pb-4',
                                            'bg-white text-black placeholder-gray-500',
                                            'dark:bg-black/50 dark:text-white dark:placeholder-white',
                                            'text-sm sm:text-base md:text-lg'
                                        )}
                                        wrapperClassName={cn('[&_label]:dark:text-gray!')}
                                        {...field}
                                    />
                                </FormControl>
                                <Button
                                    type='button'
                                    onClick={handleSendOTP}
                                    disabled={!isCanSendOTP}
                                    className={cn(
                                        'h-10 sm:h-12 md:h-14 px-3 sm:px-4 font-semibold rounded-md text-sm sm:text-base',
                                        {
                                            'bg-gray-400 text-white cursor-not-allowed': !isCanSendOTP,
                                            'bg-brand hover:bg-brand/90 text-white': isCanSendOTP
                                        }
                                    )}
                                >
                                    {countdown > 0 ? (
                                        `Gửi lại (${Math.floor(countdown / 60)}:${(countdown % 60)
                                            .toString()
                                            .padStart(2, '0')})`
                                    ) : countdown === 0 ? (
                                        'Gửi mã'
                                    ) : (
                                        <LoaderCircle className='animate-spin size-5' />
                                    )}
                                </Button>
                            </div>
                            <FormMessage className='text-red-500 text-xs sm:text-sm mt-1'>
                                {formState.errors.otp?.message && errorMessageT('otpMismatch')}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='new_password'
                    render={({ field, formState }) => (
                        <FormItem className='w-full'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    type='password'
                                    label={resetPasswordT('passwordLabel')}
                                    className={cn(
                                        'w-full h-10 sm:h-12 md:h-14 rounded-md border-none  px-4 pt-7 pb-4',
                                        'bg-white text-black placeholder-gray-500',
                                        'dark:bg-black/50 dark:text-white dark:placeholder-white',
                                        'text-sm sm:text-base md:text-lg'
                                    )}
                                    wrapperClassName={cn('[&_label]:dark:text-gray!')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-500 text-xs sm:text-sm mt-1'>
                                {getLocaleMessage(errorMessageT, formState.errors.new_password?.message)}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <Button
                    type='submit'
                    className='bg-brand hover:bg-brand/90 mt-5 text-white rounded-md font-semibold text-sm sm:text-base md:text-lg  h-10 sm:h-12 md:h-14 w-full px-4 sm:px-6 md:px-8 py-2 transition-colors duration-200 cursor-pointer'
                >
                    {isResetPasswordLoading ? <LoaderCircle className='animate-spin size-5' /> : resetPasswordT('save')}
                </Button>

                <Button
                    type='reset'
                    onClick={onReset}
                    className='bg-white hover:bg-[#e6e6e6] text-black text-sm sm:text-base md:text-lg dark:text-white dark:bg-transparent dark:hover:bg-white/15   h-10 sm:h-12 md:h-14     rounded-md font-semibold  cursor-pointer'
                >
                    {resetPasswordT('cancel')}
                </Button>
            </form>
        </Form>
    )
}
