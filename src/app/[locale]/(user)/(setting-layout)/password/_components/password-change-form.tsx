'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Link } from '@/i18n/navigation'
import BrandInput from '@/components/brand-input'
import { PasswordChangeBodyType, PasswordChangeBody } from '@/utils/validation/auth.validation'
import { cn } from '@/lib/utils'

interface PasswordChangeFormProps {
    className?: string
}

export default function PasswordChangeForm({ className }: PasswordChangeFormProps) {
    const t = useTranslations('PasswordPage')
    const errorMessageT = useTranslations('errorMessages')
    const [signOutDevices, setSignOutDevices] = useState(false)

    const form = useForm<PasswordChangeBodyType>({
        resolver: zodResolver(PasswordChangeBody),
        defaultValues: {
            current_password: '',
            new_password: '',
            confirm_password: ''
        }
    })

    const handleSubmit = (data: PasswordChangeBodyType) => {
        const submitData = {
            ...data,
            signOutDevices
        }
        console.log('Form submitted:', submitData)
    }

    const handleCancel = () => {
        form.reset()
        setSignOutDevices(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={cn('space-y-6', className)}>
                <FormField
                    control={form.control}
                    name='current_password'
                    render={({ field, formState }) => (
                        <FormItem>
                            <BrandInput label={t('currentPassword')} type='password' {...field} />
                            <FormMessage className='text-brand'>
                                {formState.errors.current_password?.message &&
                                    errorMessageT(formState.errors.current_password.message as 'passwordMinLength')}
                            </FormMessage>
                            <Link
                                href='/forgot-password'
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
                                {formState.errors.new_password?.message &&
                                    errorMessageT(formState.errors.new_password.message as 'passwordMinLength')}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='confirm_password'
                    render={({ field, formState }) => (
                        <FormItem>
                            <BrandInput label={t('confirmPassword')} type='password' {...field} />
                            <FormMessage className='text-brand'>
                                {formState.errors.confirm_password?.message &&
                                    errorMessageT(
                                        formState.errors.confirm_password.message as
                                            | 'passwordMinLength'
                                            | 'passwordMismatch'
                                    )}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <div className='flex items-center space-x-3'>
                    <Checkbox
                        id='signout-devices'
                        checked={signOutDevices}
                        onCheckedChange={(checked) => setSignOutDevices(checked as boolean)}
                        className='data-[state=checked]:bg-foreground data-[state=checked]:border-foreground'
                    />
                    <label htmlFor='signout-devices' className='text-base  cursor-pointer select-none'>
                        {t('signOutDevices')}
                    </label>
                </div>

                <div className='space-y-4 pt-2'>
                    <Button
                        type='submit'
                        className='w-full bg-foreground text-background hover:bg-foreground/90 py-6 text-lg font-semibold rounded-md'
                        size='lg'
                    >
                        {t('saveButton')}
                    </Button>

                    <Button
                        type='button'
                        onClick={handleCancel}
                        variant='ghost'
                        className='w-full py-6 text-lg font-semibold rounded-md hover:bg-accent'
                        size='lg'
                    >
                        {t('cancelButton')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
