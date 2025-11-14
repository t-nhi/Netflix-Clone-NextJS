'use client'

import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import BrandInput from '@/components/brand-input'
import Link from 'next/link'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from '@/store/services/category/category.services'
import { UpdateCategoryBodySchema, UpdateCategoryBodyType } from '@/types/dtos/category/updateCategory.dto'
import { getLocaleMessage } from '@/utils/locale.util'
import { AdminPaths } from '@/config/routes.config'
import { handleFormError } from '@/utils/handleErrors/handleFormError'

export default function CategoryEditPage({ id }: { id: string }) {
    const { data: getCategoryRes } = useGetCategoryByIdQuery({ params: { id } })
    const [updateCategoryMutate, { isLoading: isUpdating }] = useUpdateCategoryMutation()
    const category = getCategoryRes?.data || null
    const t = useTranslations('AdminPage.categoriesPage.editCategorieForm')
    const validMessage = useTranslations('AdminPage.validation')
    const desMaxChars = 300

    const form = useForm<UpdateCategoryBodyType>({
        resolver: zodResolver(UpdateCategoryBodySchema),
        defaultValues: {
            name: '',
            description: ''
        },
        mode: 'onChange'
    })

    useEffect(() => {
        if (category) {
            form.reset({
                name: category.name,
                description: category.description
            })
        }
    }, [form, category])

    const onSubmit: SubmitHandler<UpdateCategoryBodyType> = async (body) => {
        try {
            const response = await updateCategoryMutate({ params: { id }, body }).unwrap()
            toast.success(response.message)
        } catch (error) {
            handleFormError({ error, setFormError: form.setError })
        }
    }
    const onCancel = () => {
        form.reset()
    }

    if (!category) {
        return <p className='text-center text-gray-500 mt-10'>{t('notFound')}</p>
    }

    return (
        <div className='max-w-3xl mx-auto p-8 mt-10 relative'>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={AdminPaths.CATEGORIES}
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
            <h1 className='text-2xl font-semibold mb-2 text-gray-900 dark:text-white text-center'>{t('title')}</h1>
            <p className='text-sm text-gray-600 dark:text-gray-400 text-center mt-4 mb-6'>{t('subtitle')}</p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-5 flex flex-col gap-4 p-6 sm:p-8 md:px-10 md:py-4 w-full max-w-2xl mx-auto mt-12 md:mt-8'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field, formState }) => (
                            <FormItem>
                                <FormControl>
                                    <BrandInput
                                        type='text'
                                        label={t('nameLabel')}
                                        className={cn(
                                            'w-full h-12 rounded-md border px-4 text-base bg-white text-black placeholder-gray-500',
                                            'dark:bg-black/50 dark:text-white dark:placeholder-white',
                                            formState.errors.name && 'border-red-500'
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-xs text-red-500 mt-1'>
                                    {getLocaleMessage(validMessage, formState.errors.name?.message)}
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
                    <div className='flex flex-col gap-4'>
                        <Button
                            type='submit'
                            disabled={isUpdating}
                            className='bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold h-10 w-full transition-colors duration-200 cursor-pointer'
                        >
                            {isUpdating ? <LoaderCircle className='animate-spin size-5' /> : t('saveButton')}
                        </Button>

                        <Button
                            type='reset'
                            onClick={onCancel}
                            className='bg-black/5 hover:bg-black/10 text-black dark:text-white dark:bg-white/20 dark:hover:bg-white/15 rounded-lg font-semibold h-10 w-full flex items-center justify-center cursor-pointer'
                        >
                            {t('cancelButton')}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
