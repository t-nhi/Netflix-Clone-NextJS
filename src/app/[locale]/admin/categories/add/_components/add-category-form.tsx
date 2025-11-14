'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import BrandInput from '@/components/brand-input'
import { useTranslations } from 'next-intl'
import React from 'react'
import Link from 'next/link'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useCreateCategoryMutation } from '@/store/services/category/category.services'
import { CreateCategoryBodySchema, CreateCategoryBodyType } from '@/types/dtos/category/createCategory.dto'
import { getLocaleMessage } from '@/utils/locale.util'
import { handleFormError } from '@/utils/handleErrors/handleFormError'

export default function AddCategoryForm() {
    const [createCategoryMutate, { isLoading: isCreating }] = useCreateCategoryMutation()
    const t = useTranslations('AdminPage.categoriesPage.addCategorieForm')
    const validMessage = useTranslations('AdminPage.validation')
    const desMaxChars = 300

    const form = useForm<CreateCategoryBodyType>({
        resolver: zodResolver(CreateCategoryBodySchema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    const onCancel = () => {
        form.reset()
    }

    const onSubmit: SubmitHandler<CreateCategoryBodyType> = async (data) => {
        try {
            const response = await createCategoryMutate(data).unwrap()
            toast.success(response.message)
            onCancel()
        } catch (error) {
            handleFormError({ error, setFormError: form.setError })
        }
    }

    return (
        <div className='max-w-3xl mx-auto p-8 mt-10 relative'>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={'/admin/categories'}
                        className='absolute top-5 -left-4 flex items-center justify-center md:w-10 md:h-10 sm:w-9 sm:h-9 w-8 h-8 
                   rounded-lg bg-transparent dark:text-white text-black transition-all duration-200 hover:scale-105'
                    >
                        <ArrowLeft className='md:w-6 md:h-6 sm:w-5 sm:h-5 w-4 h-4' />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Back to categories</p>
                </TooltipContent>
            </Tooltip>
            <h1 className='text-2xl sm:text-3xl font-semibold text-black dark:text-white text-center'>{t('title')}</h1>
            <p className='text-sm text-gray-600 dark:text-gray-300 text-center mb-4 mt-4'>{t('subtitle')}</p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col gap-4 p-6 sm:p-8 md:px-10 md:py-4 w-full max-w-2xl mx-auto mt-12 md:mt-8'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <BrandInput
                                        id='name'
                                        label={t('nameLabel')}
                                        className={cn(
                                            'w-full h-12 rounded-md border px-4 text-base bg-white text-black placeholder-gray-500',
                                            'dark:bg-black/50 dark:text-white dark:placeholder-white',
                                            form.formState.errors.name && 'border-red-500'
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-xs text-red-500 mt-1'>
                                    {getLocaleMessage(validMessage, form.formState.errors.name?.message)}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field, formState }) => {
                            return (
                                <FormItem>
                                    <FormControl>
                                        <div className='relative'>
                                            <p className='mb-1 dark:text-gray-200 text-black/60 text-[14px] font-normal'>
                                                {t('descLabel')}
                                            </p>
                                            <textarea
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={field.onChange}
                                                rows={3}
                                                className={cn(
                                                    'border overflow-hidden resize-none scrollbar-hide border-gray-300 dark:border-gray-700 rounded-lg w-full p-2 bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none',
                                                    formState.errors.description && 'border-red-500'
                                                )}
                                            />
                                            <div className='text-right text-xs md:text-sm'>
                                                <span
                                                    className={
                                                        formState.errors.description ? 'text-red-500' : 'text-gray-400'
                                                    }
                                                >
                                                    {field.value?.length ?? 0}/{desMaxChars}
                                                </span>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage className='text-red-500 text-xs sm:text-sm mt-1'>
                                        {getLocaleMessage(validMessage, formState.errors.description?.message)}
                                    </FormMessage>
                                </FormItem>
                            )
                        }}
                    />

                    <Button
                        type='submit'
                        className='bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold h-10 w-full transition-colors duration-200 cursor-pointer'
                    >
                        {isCreating ? <LoaderCircle className='animate-spin size-5' /> : t('addButton')}
                    </Button>

                    <Button
                        type='reset'
                        onClick={onCancel}
                        className='bg-black/5 hover:bg-black/10 text-black dark:text-white dark:bg-white/20 dark:hover:bg-white/15 rounded-lg font-semibold h-10 w-full flex items-center justify-center cursor-pointer'
                    >
                        {t('cancelButton')}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
