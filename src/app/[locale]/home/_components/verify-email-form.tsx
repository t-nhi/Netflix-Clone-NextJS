'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import BrandInput from '@/components/brand-input'
import { ChevronRight, LoaderCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { VerifyEmailBodySchema, VerifyEmailBodyType } from '@/types/dtos/auth/verifyEmail.dto'
import { useVerifyEmailMutation } from '@/store/services/auth.services'
import { useRouter } from '@/i18n/navigation'
import { SessionStorageKeys } from '@/constants/session-storage-keys.enum'
import { handleFormError } from '@/utils/handleErrors/handleFormError'
import { getLocaleMessage } from '@/utils/locale.util'

export default function VerifyEmailForm() {
    const router = useRouter()
    const errorMessageT = useTranslations('errorMessages')
    const formT = useTranslations('SignupForm')

    const [verifyEmailMutate, { isLoading: isVerifyEmailLoading }] = useVerifyEmailMutation()

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
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col md:flex-row gap-2 justify-center items-center  md:items-start  mx-auto w-full h-fit  '
            >
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field, formState }) => (
                        <FormItem className='flex-1 w-full text-left '>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    label={formT('emailLabel')}
                                    className='h-12 md:h-14 bg-black/50!'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {getLocaleMessage(errorMessageT, formState.errors.email?.message)}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button
                    disabled={isVerifyEmailLoading}
                    type='submit'
                    className='py-2 px-2 h-12!  md:h-14! md:w-40 bg-brand  hover:bg-brand/80 text-lg  md:text-xl text-white font-medium cursor-pointer items-center'
                >
                    {isVerifyEmailLoading ? (
                        <LoaderCircle className='animate-spin size-5' />
                    ) : (
                        formT('getStartedButton')
                    )}
                    <ChevronRight className='size-6' />
                </Button>
            </form>
        </Form>
    )
}
