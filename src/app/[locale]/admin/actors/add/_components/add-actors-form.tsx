'use client'

import { useState, ChangeEvent, useEffect, useMemo } from 'react'
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
import { CreateActorBodySchema, CreateActorBodyType } from '@/types/dtos/actor/createActor.dto'
import { useCreateActorMutation } from '@/store/services/actor/actor.services'
import { handleFormError } from '@/utils/handleErrors/handleFormError'
import { getLocaleMessage } from '@/utils/locale.util'
import { AdminPaths } from '@/config/routes.config'
import { useUploadImageMutation } from '@/store/services/upload/upload.services'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const desMaxChars = 500
export default function AddActorForm() {
    const [createActorMutate, { isLoading: isCreating }] = useCreateActorMutation()
    const [uploadImageMutate, { isLoading: isImageUploading }] = useUploadImageMutation()
    const t = useTranslations('AdminPage.actorsPage.addActorForm')
    const validMessage = useTranslations('AdminPage.validation')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarURLPreview, setAvatarURLPreview] = useState<string | null>(null)

    const form = useForm<CreateActorBodyType>({
        resolver: zodResolver(CreateActorBodySchema),
        defaultValues: { fullname: '', dateOfBirth: '', biography: '', avatar: '' },
        mode: 'onChange'
    })

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

    const onSubmit: SubmitHandler<CreateActorBodyType> = async (data) => {
        try {
            if (avatarFile) {
                const formData = new FormData()
                formData.append('file', avatarFile)
                const uploadRes = await uploadImageMutate(formData).unwrap()
                data.avatar = uploadRes.data.url
            } else {
                data.avatar = data.avatar || ''
            }

            const payload = {
                ...data,
                biography: data.biography || '',
                dateOfBirth: data.dateOfBirth || ''
            }
            const response = await createActorMutate(payload).unwrap()
            toast.success(response.message)
            onReset()
        } catch (error) {
            handleFormError({ error, setFormError: form.setError })
        }
    }

    const onReset = () => {
        form.reset()
        setAvatarFile(null)
        if (avatarURLPreview) {
            URL.revokeObjectURL(avatarURLPreview)
            setAvatarURLPreview(null)
        }
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
        return '/images/common/avatar_default.png'
    }, [avatarFile, avatarURLPreview])

    return (
        <div className='max-w-3xl mx-auto p-8 mt-10 relative'>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={AdminPaths.ACTORS}
                        className='absolute top-5 -left-4 flex items-center justify-center md:w-10 md:h-10 sm:w-9 sm:h-9 w-8 h-8 
                rounded-lg bg-transparent dark:text-white text-black transition-all duration-200 hover:scale-105'
                    >
                        <ArrowLeft className='md:w-6 md:h-6 sm:w-5 sm:h-5 w-4 h-4' />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>Back to Actors</TooltipContent>
            </Tooltip>
            <h1 className='text-2xl font-semibold mb-2 text-gray-900 dark:text-white text-center'>{t('title')}</h1>
            <p className='text-sm text-gray-600 dark:text-gray-400 text-center mb-6'>{t('subtitle')}</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                    <div className='flex items-start gap-6'>
                        <div className='relative flex justify-center items-center aspect-3/4 w-[180px] overflow-hidden rounded-lg border'>
                            <label htmlFor='actor-image' className='cursor-pointer group w-full h-full'>
                                <Image
                                    src={previewURL || '/images/common/avatar_default.png'}
                                    alt='avatar'
                                    width={200}
                                    height={266}
                                    className='object-cover w-full h-full transition group-hover:opacity-80'
                                />
                                <div
                                    className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition'
                                    title={t('addImage')}
                                >
                                    <Camera className='w-6 h-6 text-white' />
                                </div>
                            </label>
                            <input id='actor-image' type='file' accept='image/*' onChange={handleImageChange} hidden />
                        </div>

                        <div className='flex-1 space-y-5'>
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
                                                        'w-full bg-transparent text-gray-900 dark:text-gray-200 text-lg border-b border-gray-300 outline-none py-2 px-9 focus:border-black',
                                                        formState.errors.fullname && 'border-red-500'
                                                    )}
                                                />
                                                <span
                                                    className='absolute left-0 bottom-0 h-0.5 bg-black dark:bg-white w-0
                                                                group-focus-within:w-full
                                                                transition-all duration-300 ease-out
                                                                origin-left'
                                                ></span>
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
                                                    value={field.value || ''}
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
                                render={({ field, formState }) => {
                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <div className='relative'>
                                                    <p className='mb-1 dark:text-gray-200 text-black/60 text-[14px] font-normal'>
                                                        {t('bioLabel')}
                                                    </p>
                                                    <Textarea {...field} placeholder={t('bioPlaceholder')} rows={3} />
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
                                    )
                                }}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end gap-2 mt-5'>
                        <Button
                            type='button'
                            onClick={onReset}
                            className='
                                    h-8 px-8 rounded-lg
                                    bg-[#6d6d6e]/70 hover:bg-[#6d6d6e]/60
                                    text-white hover:text-white 
                                    transition-all duration-300 md:text-[14px] text-[12px] font-mono cursor-pointer
    '
                        >
                            {t('cancelButton')}
                        </Button>
                        <Button
                            type='submit'
                            disabled={isCreating || isImageUploading}
                            className='
                                    h-8 px-4 rounded-lg
                                    bg-brand hover:bg-brand/90
                                    text-white 
                                    md:text-[14px] text-[12px] font-mono transition-all duration-300 cursor-pointer
                                    '
                        >
                            {isCreating || isImageUploading ? (
                                <LoaderCircle className='animate-spin size-5' />
                            ) : (
                                t('addButton')
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
