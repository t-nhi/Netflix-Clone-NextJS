'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Link } from '@/i18n/navigation'
import BrandInput from '@/components/brand-input'
import { cn } from '@/lib/utils'
import { changePasswordBodySchema, ChangePasswordBodyType } from '@/types/dtos/auth/changePassword.dto'
import { useChangePasswordMutation } from '@/store/services/user.services'
import { handleFormError } from '@/utils/handleErrors/handleFormError'
import { getLocaleMessage } from '@/utils/locale.util'
import { toast } from 'sonner'

interface PasswordChangeFormProps {
    className?: string
}

export default function PasswordChangeForm({ className }: PasswordChangeFormProps) {
    const [changePasswordMutate, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation()
    const t = useTranslations('PasswordPage')
    const errorMessageT = useTranslations('errorMessages')

    const form = useForm<ChangePasswordBodyType>({
        resolver: zodResolver(changePasswordBodySchema),
        defaultValues: {
            new_password: '',
            old_password: '',
            new_password_confirmation: ''
        }
    })

    const handleSubmit = async (data: ChangePasswordBodyType) => {
        if (isChangePasswordLoading) return
        try {
            const result = await changePasswordMutate(data).unwrap()
            toast.success(result.message)
        } catch (error) {
            handleFormError({
                error,
                setFormError: form.setError
            })
        }
    }

    const handleCancel = () => {
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={cn('space-y-6', className)}>
                <FormField
                    control={form.control}
                    name='old_password'
                    render={({ field, formState }) => (
                        <FormItem>
                            <BrandInput label={t('currentPassword')} type='password' {...field} />
                            <FormMessage className='text-brand'>
                                {getLocaleMessage(errorMessageT, formState.errors.old_password?.message)}
                            </FormMessage>
                            <Link
                                href='/reset-password'
                                className='inline-block mt-1 text-sm text-blue-500 dark:text-blue-400 hover:underline'
                            >
                                {t('forgotPassword')}
                            </Link>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='new_password'
                    render={({ field, formState }) => (
                        <FormItem>
                            <BrandInput label={t('newPassword')} type='password' {...field} />
                            <FormMessage className='text-brand'>
                                {getLocaleMessage(errorMessageT, formState.errors.new_password?.message)}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='new_password_confirmation'
                    render={({ field, formState }) => (
                        <FormItem>
                            <BrandInput label={t('confirmPassword')} type='password' {...field} />
                            <FormMessage className='text-brand'>
                                {getLocaleMessage(errorMessageT, formState.errors.new_password_confirmation?.message)}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <div className='space-y-4 pt-2'>
                    <Button
                        type='submit'
                        className='w-full cursor-pointer bg-foreground text-background hover:bg-foreground/90 py-6 text-lg font-semibold rounded-md'
                        size='lg'
                    >
                        {t('saveButton')}
                    </Button>

                    <Button
                        type='button'
                        onClick={handleCancel}
                        variant='ghost'
                        className='w-full cursor-pointer py-6 text-lg font-semibold rounded-md hover:bg-accent'
                        size='lg'
                    >
                        {t('cancelButton')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
