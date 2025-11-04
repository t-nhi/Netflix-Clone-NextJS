'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import BrandInput from '@/components/brand-input'
import { RegisterBody } from '@/utils/validation/auth.validation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

const RegFormSchema = RegisterBody.extend({
    agreeToTerms: z.boolean()
})

type RegFormType = z.infer<typeof RegFormSchema>

export default function RegisterForm() {
    const t = useTranslations('RegformPage')
    const errorMessageT = useTranslations('errorMessages')
    const form = useForm<RegFormType>({
        resolver: zodResolver(RegFormSchema),
        defaultValues: {
            email: '',
            password: '',
            agreeToTerms: false
        }
    })

    function onSubmit(data: RegFormType) {
        console.log('Registration data:', data)
        toast.success(t('registrationSuccess'))
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
                                <BrandInput label={t('emailLabel')} type='email' className='h-[56px] ' {...field} />
                            </FormControl>
                            <FormMessage className='text-brand'>
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
                        <FormItem>
                            <FormControl>
                                <BrandInput
                                    label={t('passwordLabel')}
                                    type='password'
                                    className='h-[56px] '
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-brand'>
                                {formState.errors.password?.message &&
                                    errorMessageT(formState.errors.password.message as 'passwordMinLength')}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='agreeToTerms'
                    render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className='space-y-1'>
                                <FormLabel className='text-sm  font-normal  cursor-pointer'>
                                    {t('agreeToTerms')}
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <div className='pt-6'>
                    <Button
                        type='submit'
                        className='w-full h-[48px] bg-brand hover:bg-brand/90 text-white text-base font-semibold rounded-sm cursor-pointer'
                    >
                        {t('continueButton')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
