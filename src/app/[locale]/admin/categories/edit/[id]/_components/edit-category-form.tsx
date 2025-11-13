'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, ControllerRenderProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { CategoryType } from '@/types/category.type'
import { getMockCategoryById } from '@/app/[locale]/admin/_mock/categories.mock'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import BrandInput from '@/components/brand-input'
import { useRouter } from 'next/navigation'
import { GenreBody, GenreBodyType } from '@/utils/validation/category.validation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CategoryEditPage({ id }: { id: string }) {
    const [category, setCategory] = useState<CategoryType | null>(null)
    const t = useTranslations('AdminPage.categoriesPage.editCategorieForm')
    const validMessage = useTranslations('AdminPage.validation')
    const router = useRouter()
    const desMaxChars = 300

    const form = useForm<GenreBodyType>({
        resolver: zodResolver(GenreBody),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    useEffect(() => {
        if (!id) return
        const found = getMockCategoryById(id)
        if (found) {
            setCategory(found)
            form.reset({
                name: found.name,
                description: found.description
            })
        } else {
            console.warn(t('notFound'))
        }
    }, [id, t, form])

    const onSubmit: SubmitHandler<GenreBodyType> = (data) => {
        console.log('Edited category:', data)
        toast.success(t('toastSuccess'))
        router.push('/admin/categories')
    }
    const onCancel = () => {
        if (category) {
            form.reset({
                name: category.name,
                description: category.description
            })
        }
    }

    if (!category) {
        return <p className='text-center text-gray-500 mt-10'>{t('notFound')}</p>
    }

    return (
        <div className='max-w-3xl mx-auto p-8 mt-10 relative'>
            <Link
                href={'/admin/categories'}
                className='absolute top-5 -left-4 flex items-center justify-center md:w-10 md:h-10 sm:w-9 sm:h-9 w-8 h-8 
                   rounded-lg bg-transparent dark:text-white text-black transition-all duration-200 hover:scale-105'
            >
                <ArrowLeft className='md:w-6 md:h-6 sm:w-5 sm:h-5 w-4 h-4' />
            </Link>
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
                                    {formState.errors.name?.message &&
                                        validMessage(
                                            formState.errors.name.message as
                                                | 'genreNameRequired'
                                                | 'genreNameTooShort'
                                                | 'genreNameTooLong'
                                        )}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field, formState }) => {
                            const currentLength = field.value?.length || 0

                            const handleChange = (
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                                field: ControllerRenderProps<GenreBodyType, 'description'>
                            ) => {
                                const value = e.target.value
                                if (value.length <= desMaxChars) {
                                    field.onChange(value)
                                }
                            }

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
                                                onChange={(e) => handleChange(e, field)}
                                                rows={3}
                                                className={cn(
                                                    'border overflow-hidden resize-none scrollbar-hide border-gray-300 dark:border-gray-700 rounded-lg w-full p-2 bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none',
                                                    formState.errors.description && 'border-red-500'
                                                )}
                                            />
                                            <div className='text-right text-xs md:text-sm'>
                                                <span
                                                    className={
                                                        currentLength > desMaxChars * 0.8
                                                            ? 'text-red-500'
                                                            : 'text-gray-400'
                                                    }
                                                >
                                                    {currentLength}/{desMaxChars}
                                                </span>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage className='text-xs text-red-500 mt-1'>
                                        {formState.errors.description?.message &&
                                            validMessage(
                                                formState.errors.description.message as 'genreDescriptionTooLong'
                                            )}
                                    </FormMessage>
                                </FormItem>
                            )
                        }}
                    />
                    <div className='flex flex-col gap-4'>
                        <Button
                            type='submit'
                            className='bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold h-10 w-full transition-colors duration-200 cursor-pointer'
                        >
                            {t('saveButton')}
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
