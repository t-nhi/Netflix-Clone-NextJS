'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { ArrowLeft, Camera, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getMockActorById } from '@/app/[locale]/admin/_mock/actors.mock'
import { useTranslations } from 'next-intl'
import { ActorBody, ActorBodyType } from '@/utils/validation/categories.validation'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditActorForm({ id }: { id: string }) {
    const [preview, setPreview] = useState('/images/actor/default.png')
    const [bioLength, setBioLength] = useState(0)
    const desMaxChars = 500
    const t = useTranslations('AdminPage.actorsPage.editActorForm')
    const validMessage = useTranslations('AdminPage.validation')
    const router = useRouter()

    const form = useForm<ActorBodyType>({
        resolver: zodResolver(ActorBody),
        defaultValues: { fullName: '', dateOfBirth: '', biography: '' }
    })

    useEffect(() => {
        if (!id || typeof id !== 'string') return
        const found = getMockActorById(id)
        if (found) {
            form.reset({
                fullName: found.fullName,
                dateOfBirth: found.dateOfBirth || '',
                biography: found.biography || ''
            })
            setPreview(found.image || '/images/actor/default.png')
            setBioLength(found.biography?.length || 0)
        }
    }, [id, form])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPreview(imageUrl)
        }
    }

    const onSubmit = (data: ActorBodyType) => {
        console.log('Edited actor:', data)
        toast.success(t('toastSuccess'))
        router.push('/admin/actors')
    }
    const onClose = () => {
        router.push('/admin/actors')
    }

    return (
        <div className='max-w-3xl mx-auto p-8 mt-10 relative'>
            <Link
                href={'/admin/actors'}
                className='absolute top-5 -left-4 flex items-center justify-center md:w-10 md:h-10 sm:w-9 sm:h-9 w-8 h-8 
                   rounded-lg bg-transparent dark:text-white text-black transition-all duration-200 hover:scale-105'
            >
                <ArrowLeft className='md:w-6 md:h-6 sm:w-5 sm:h-5 w-4 h-4' />
            </Link>
            <h1 className='text-2xl font-semibold mb-2 text-gray-900 dark:text-white text-center'>{t('title')}</h1>
            <p className='text-sm text-gray-600 dark:text-gray-400 text-center mb-6'>{t('subtitle')}</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                    <div className='flex items-start gap-10'>
                        <div className='relative flex justify-center items-center aspect-[3/4] w-[180px] overflow-hidden rounded-lg border'>
                            <label htmlFor='actor-image' className='cursor-pointer group w-full h-full'>
                                <Image
                                    src={preview}
                                    alt='avatar'
                                    width={200}
                                    height={266}
                                    className='object-cover w-full h-full transition group-hover:opacity-80'
                                />
                                <div
                                    className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition'
                                    title={t('editImage')}
                                >
                                    <Camera className='w-6 h-6 text-white' />
                                </div>
                            </label>
                            <input id='actor-image' type='file' accept='image/*' onChange={handleImageChange} hidden />
                        </div>

                        <div className='flex flex-col gap-5 w-full'>
                            <FormField
                                control={form.control}
                                name='fullName'
                                render={({ field, formState }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className='relative group w-full min-w-[200px] max-w-[400px]'>
                                                <User className='absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500' />
                                                <input
                                                    type='text'
                                                    placeholder={t('nameLabel')}
                                                    {...field}
                                                    className={cn(
                                                        'w-full bg-transparent text-gray-900 dark:text-gray-200 text-lg border-b border-gray-300 outline-none py-2 pl-10',
                                                        formState.errors.fullName && 'border-red-500'
                                                    )}
                                                />
                                                <span
                                                    className='absolute left-0 bottom-0 h-[2px] bg-black dark:bg-white w-0
                                                                group-focus-within:w-full
                                                                transition-all duration-300 ease-out
                                                                origin-left'
                                                ></span>
                                            </div>
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {formState.errors.fullName?.message &&
                                                validMessage(
                                                    formState.errors.fullName.message as
                                                        | 'fullNameRequired'
                                                        | 'fullNameTooShort'
                                                        | 'fullNameTooLong'
                                                )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='dateOfBirth'
                                render={({ field, formState }) => (
                                    <FormItem>
                                        <div className='flex items-center gap-3'>
                                            <p className='text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap'>
                                                {t('dobLabel')}
                                            </p>
                                            <FormControl>
                                                <input
                                                    type='date'
                                                    {...field}
                                                    className={cn(
                                                        'w-fit p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none',
                                                        formState.errors.dateOfBirth && 'border-red-500'
                                                    )}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {formState.errors.dateOfBirth?.message &&
                                                validMessage(
                                                    formState.errors.dateOfBirth.message as 'invalidDateFormat'
                                                )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='biography'
                                render={({ field, formState }) => (
                                    <FormItem>
                                        <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                                            {t('bioLabel')}
                                        </label>
                                        <FormControl>
                                            <div className='relative'>
                                                <textarea
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        if (value.length <= desMaxChars) {
                                                            field.onChange(value)
                                                            setBioLength(value.length)
                                                        }
                                                    }}
                                                    placeholder={t('bioPlaceholder')}
                                                    rows={3}
                                                    className={cn(
                                                        'border resize-none overflow-hidden scrollbar-hide rounded-lg w-full p-2 dark:bg-black dark:text-white bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none',
                                                        formState.errors.biography && 'border-red-500'
                                                    )}
                                                />
                                                <div className='text-right text-xs md:text-sm'>
                                                    <span
                                                        className={
                                                            bioLength > desMaxChars * 0.8
                                                                ? 'text-red-500'
                                                                : 'text-gray-400'
                                                        }
                                                    >
                                                        {bioLength}/{desMaxChars}
                                                    </span>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {formState.errors.biography?.message &&
                                                validMessage(formState.errors.biography.message as 'biographyTooLong')}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end gap-2 mt-5'>
                        <Button
                            type='button'
                            onClick={onClose}
                            className='
                                    h-8 px-8 rounded-[4px]
                                    bg-[#6d6d6e]/70 hover:bg-[#6d6d6e]/60
                                    text-white hover:text-white 
                                    transition-all duration-300 md:text-[14px] text-[12px] font-mono cursor-pointer
    '
                        >
                            {t('cancelButton')}
                        </Button>
                        <Button
                            type='submit'
                            className='
                                    h-8 px-4 rounded-[4px]
                                    bg-brand hover:bg-brand/90
                                    text-white 
                                    md:text-[14px] text-[12px] font-mono transition-all duration-300 cursor-pointer
                                    '
                        >
                            {t('saveButton')}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
