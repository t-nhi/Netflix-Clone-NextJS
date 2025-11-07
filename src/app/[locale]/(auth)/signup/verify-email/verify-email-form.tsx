'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import BrandInput from '@/components/brand-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { VerifyEmailBodySchema, VerifyEmailBodyType } from '@/types/dtos/auth/verifyEmail.dto'
import { useVerifyEmailMutation } from '@/store/services/auth.services'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from '@/i18n/navigation'
import { SessionStorageKeys } from '@/constants/session-storage-keys.enum'
import { handleFormError } from '@/utils/handleErrors/handleFormError'
import { getLocaleMessage } from '@/utils/locale.util'

export default function VerifyEmailForm() {
    const [verifyEmailMutate, { isLoading: isVerifying }] = useVerifyEmailMutation()
    const router = useRouter()
    const errorMessageT = useTranslations('errorMessages')
    const formT = useTranslations('SignupForm')
    const form = useForm<VerifyEmailBodyType>({
        resolver: zodResolver(VerifyEmailBodySchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = async (data: VerifyEmailBodyType) => {
        try {
            await verifyEmailMutate(data).unwrap()
            sessionStorage.setItem(SessionStorageKeys.SIGNUP_EMAIL, data.email)
            router.push('/signup/verify-email-sent')
        } catch (error) {
            console.error('Error verifying email:', error)
            handleFormError({
                error,
                setFormError: form.setError
            })
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
                                <BrandInput label={formT('emailLabel')} type='email' className='h-14 ' {...field} />
                            </FormControl>
                            <FormMessage className='text-brand'>
                                {getLocaleMessage(errorMessageT, formState.errors.email?.message)}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <div className='pt-6'>
                    <Button
                        type='submit'
                        className='w-full h-12 bg-brand hover:bg-brand/90 text-white text-base font-semibold rounded-sm cursor-pointer'
                    >
                        {isVerifying ? <LoaderCircle className='animate-spin size-5' /> : formT('getStartedButton')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
