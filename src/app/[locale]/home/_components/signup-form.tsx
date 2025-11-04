'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { RegisterEmailBody, RegisterEmailBodyType } from '@/utils/validation/auth.validation'
import BrandInput from '@/components/brand-input'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SignupForm() {
    const errorMessageT = useTranslations('errorMessages')
    const formT = useTranslations('SignupForm')

    const form = useForm<RegisterEmailBodyType>({
        resolver: zodResolver(RegisterEmailBody),
        defaultValues: {
            email: ''
        }
    })

    function onSubmit(data: RegisterEmailBodyType) {
        toast('You submitted the following values')
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
                                    className='h-[48px] md:h-[56px] bg-black/50!'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.email?.message &&
                                    errorMessageT(formState.errors.email.message as 'emailInvalid' | 'emailRequired')}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button
                    type='submit'
                    className='py-2 px-2 h-[48px]!  md:h-[56px]! md:w-[160px] bg-brand  hover:bg-brand/80 text-lg  md:text-xl text-white font-medium cursor-pointer items-center'
                >
                    {formT('getStartedButton')} <ChevronRight className='size-6' />
                </Button>
            </form>
        </Form>
    )
}
