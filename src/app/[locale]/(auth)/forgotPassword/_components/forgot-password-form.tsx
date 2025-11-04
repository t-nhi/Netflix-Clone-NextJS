'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import BrandInput from '@/components/brand-input'
import { useTranslations } from 'next-intl'
import { RegisterEmailBody, RegisterEmailBodyType } from '@/utils/validation/auth.validation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import SuccessMessageForm from '@/app/[locale]/(auth)/forgotPassword/_components/message-form'

export default function ForgotPasswordForm() {
    const errorMessageT = useTranslations('errorMessages')
    const forgotT = useTranslations('ForgotPasswordPage')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<RegisterEmailBodyType>({
        resolver: zodResolver(RegisterEmailBody) as Resolver<RegisterEmailBodyType>,
        defaultValues: {
            email: ''
        }
    })
    const onSubmit: SubmitHandler<RegisterEmailBodyType> = (data) => {
        try {
            setIsSubmitted(true)
            toast.success(forgotT('successTitle'))
            console.log('Form data:', data)
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error)
            toast.error(errorMessageT('genericError'))
        }
    }

    if (isSubmitted) {
        const email = form.getValues('email')
        return <SuccessMessageForm email={email} form={form} />
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-4 p-4 sm:p-6 md:p-8 bg-[#f2f2f2] dark:bg-neutral-700/50'
            >
                <h1 className='text-2xl sm:text-3xl text-black dark:text-white font-semibold mb-4 text-center netflix-sans-bold'>
                    {forgotT('title')}
                </h1>
                <p className='text-black dark:text-white text-sm sm:text-base mb-6 text-left'>
                    {forgotT('description')}
                </p>

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field, formState }) => (
                        <FormItem className='w-full'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    label='Email'
                                    className={cn(
                                        'w-full h-10 sm:h-12 md:h-14 rounded-md border px-4 pt-7 pb-4',
                                        'bg-white text-black placeholder-gray-500',
                                        'dark:bg-black/50 dark:text-white dark:placeholder-white',
                                        'text-sm sm:text-base md:text-lg'
                                    )}
                                    wrapperClassName={cn(
                                        '[&_label]:dark:text-gray!',
                                        '[&_label]:text-sm [&_label]:sm:text-base [&_label]:md:text-lg'
                                    )}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-brand text-xs sm:text-sm mt-1'>
                                {formState.errors.email?.message &&
                                    errorMessageT(formState.errors.email.message as 'emailInvalid' | 'emailRequired')}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <Button
                    type='submit'
                    className='bg-red-600 hover:bg-red-700 text-white rounded-[4px] font-semibold netflix-sans-bold h-[40px] w-full px-4 sm:px-6 md:px-8 py-2 transition-colors duration-200 cursor-pointer'
                    disabled={form.formState.isSubmitting}
                >
                    {forgotT('sendEmail')}
                </Button>
            </form>
        </Form>
    )
}
