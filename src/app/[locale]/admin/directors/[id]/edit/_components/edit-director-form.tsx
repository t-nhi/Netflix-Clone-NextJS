'use client'

import { useEffect, useState, ChangeEvent, useMemo } from 'react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { ArrowLeft, Camera, LoaderCircle, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useGetDirectorByIdQuery, useUpdateDirectorByIdMutation } from '@/store/services/director/director.services'

import { UpdateDirectorBodySchema, UpdateDirectorBodyType } from '@/types/dtos/director/updateDirector.dto'

import { AdminPaths } from '@/config/routes.config'
import { handleFormError } from '@/utils/handleErrors/handleFormError'
import { getLocaleMessage } from '@/utils/locale.util'
import { useUploadImageMutation } from '@/store/services/upload/upload.services'
import { getServerUrl } from '@/utils/url.util'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

export default function EditDirectorForm({ id }: { id: string }) {
    const desMaxChars = 500
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarURLPreview, setAvatarURLPreview] = useState<string | null>(null)

    const { data: getDirectorRes } = useGetDirectorByIdQuery({ id })
    const [updateDirectorMutate, { isLoading: isUpdating }] = useUpdateDirectorByIdMutation()
    const [uploadImageMutate, { isLoading: isImageUploading }] = useUploadImageMutation()
    const director = getDirectorRes?.data || null

    const t = useTranslations('AdminPage.directorPage.editDirectorForm')
    const validMessage = useTranslations('AdminPage.validation')

    const form = useForm<UpdateDirectorBodyType>({
        resolver: zodResolver(UpdateDirectorBodySchema),
        defaultValues: { fullname: '', biography: '', avatar: '', dateOfBirth: '' },
        mode: 'onChange'
    })

    useEffect(() => {
        if (director) {
            form.reset({
                fullname: director.fullname,
                biography: director.biography || '',
                avatar: director.avatar || '',
                dateOfBirth: director.dateOfBirth || ''
            })
            setAvatarFile(null)
            setAvatarURLPreview(null)
        }
    }, [form, director])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (avatarURLPreview) {
            URL.revokeObjectURL(avatarURLPreview)
        }
        const previewURL = URL.createObjectURL(file)
        setAvatarFile(file)
        setAvatarURLPreview(previewURL)
    }

    const onSubmit: SubmitHandler<UpdateDirectorBodyType> = async (data) => {
        try {
            if (avatarFile) {
                const formData = new FormData()
                formData.append('file', avatarFile)
                const uploadRes = await uploadImageMutate(formData).unwrap()
                data.avatar = uploadRes.data.url
            } else {
                data.avatar = director?.avatar || null
            }

            const response = await updateDirectorMutate({
                body: data,
                params: { id }
            }).unwrap()
            toast.success(response.message)
            onReset()
        } catch (error) {
            handleFormError({ error, setFormError: form.setError })
        }
    }

    const onReset = () => {
        if (avatarURLPreview) {
            URL.revokeObjectURL(avatarURLPreview)
        }
        setAvatarFile(null)
        setAvatarURLPreview(null)
    }

    useEffect(() => {
        return () => {
            if (avatarURLPreview) {
                URL.revokeObjectURL(avatarURLPreview)
            }
        }
    }, [avatarURLPreview])

    const previewURL = useMemo(() => {
        if (avatarFile) return avatarURLPreview
        if (director?.avatar) return getServerUrl(director.avatar)

        return null
    }, [avatarFile, avatarURLPreview, director?.avatar])

    return (
        <div className='max-w-3xl mx-auto p-8 mt-10 relative'>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={AdminPaths.DIRECTORS}
                        className='absolute top-5 -left-4 flex items-center justify-center md:w-10 md:h-10 sm:w-9 sm:h-9 w-8 h-8 
                   rounded-lg bg-transparent dark:text-white text-black transition-all duration-200 hover:scale-105'
                    >
                        <ArrowLeft className='md:w-6 md:h-6 sm:w-5 sm:h-5 w-4 h-4' />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>Back to Directors</TooltipContent>
            </Tooltip>

            <h1 className='text-2xl font-semibold mb-2 text-gray-900 dark:text-white text-center'>{t('title')}</h1>
            <p className='text-sm text-gray-600 dark:text-gray-400 text-center mb-6'>{t('subtitle')}</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                    <div className='flex items-start gap-10'>
                        <div className='relative flex justify-center items-center aspect-3/4 w-[180px] overflow-hidden rounded-lg border'>
                            <label htmlFor='director-image' className='cursor-pointer group w-full h-full'>
                                <Image
                                    src={previewURL || '/images/common/avatar_default.png'}
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
                            <input
                                id='director-image'
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                                hidden
                            />
                        </div>

                        <div className='flex flex-col gap-5 w-full'>
                            <FormField
                                control={form.control}
                                name='fullname'
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
                                                        formState.errors.fullname && 'border-red-500'
                                                    )}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.fullname?.message)}
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
                                                <Input
                                                    type='date'
                                                    {...field}
                                                    value={field.value ? field.value : ''}
                                                    className={cn(
                                                        'w-fit p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none',
                                                        formState.errors.dateOfBirth && 'border-red-500'
                                                    )}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.dateOfBirth?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='biography'
                                render={({ field, formState }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className='relative'>
                                                <p className='mb-1 dark:text-gray-200 text-black/60 text-[14px] font-normal'>
                                                    {t('bioLabel')}
                                                </p>
                                                <Textarea {...field} value={field.value ?? ''} rows={3} />
                                                <div className='text-right text-xs md:text-sm'>
                                                    <span
                                                        className={
                                                            formState.errors.biography
                                                                ? 'text-red-500'
                                                                : 'text-gray-400'
                                                        }
                                                    >
                                                        {field.value?.length ?? 0}/{desMaxChars}
                                                    </span>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-xs sm:text-sm mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.biography?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end gap-2 mt-5'>
                        <Button
                            type='button'
                            onClick={onReset}
                            className='h-8 px-8 rounded-lg bg-[#6d6d6e]/70 hover:bg-[#6d6d6e]/60 text-white transition-all duration-300 md:text-[14px] text-[12px] font-mono'
                        >
                            {t('cancelButton')}
                        </Button>

                        <Button
                            type='submit'
                            disabled={isUpdating || isImageUploading}
                            className='h-8 px-4 rounded-lg bg-brand hover:bg-brand/90 text-white md:text-[14px] text-[12px] font-mono transition-all duration-300'
                        >
                            {isUpdating || isImageUploading ? (
                                <LoaderCircle className='animate-spin size-5' />
                            ) : (
                                t('saveButton')
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
