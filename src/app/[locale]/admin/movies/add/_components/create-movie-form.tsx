'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from '@/components/ui/select'

import { getAgeRankNameFromEnum } from '@/helper/getNameFromStatus'
import PosterPicker from '@/app/[locale]/admin/movies/_components/poster-picker'
import { AgeRank } from '@/constants/movie/age-rank.enum'
import { CreateMovieBodySchema, CreateMovieBodyType } from '@/types/dtos/movie/createMovie.dto'
import { useGetAllDirectorsQuery } from '@/store/services/director/director.services'
import { useGetAllActorsQuery } from '@/store/services/actor/actor.services'
import { useGetAllCategoryQuery } from '@/store/services/category/category.services'
import { useCreateMovieMutation } from '@/store/services/movie/movie.services'
import { handleFormError } from '@/utils/handleErrors/handleFormError'
import { getLocaleMessage } from '@/utils/locale.util'
import { cn } from '@/lib/utils'
import ComboboxMultiSelect from '@/components/ui/combobox-multi-select'
import { useCountries } from '@/hooks/shared/useCountries'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { UploadVideoViewMode } from '../../_components/video-picker/upload-video'
import VideoPicker from '@/app/[locale]/admin/movies/_components/video-picker'

const MAX_DESC_LENGTH = 500
export default function CreateMovieForm() {
    const t = useTranslations('AdminPage.uploadFilm.uploadForm')
    const validMessage = useTranslations('AdminPage.uploadFilm.validation')
    const uploadTrailer = useTranslations('AdminPage.uploadFilm.uploadTrailer')
    const [isInitialRender, setIsInitialRender] = useState(true)
    const [videoFile, setVideoFile] = useState<File | null>(null)

    const { data: directorsResData } = useGetAllDirectorsQuery()
    const { data: actorsResData } = useGetAllActorsQuery()
    const { data: categoriesResData } = useGetAllCategoryQuery()
    const countries = useCountries()

    const [createMovieMutate, { isLoading: isCreateMovieLoading }] = useCreateMovieMutation()

    const directors = directorsResData?.data || []
    const actors = actorsResData?.data || []
    const genres = categoriesResData?.data || []

    const form = useForm<CreateMovieBodyType>({
        resolver: zodResolver(CreateMovieBodySchema),
        defaultValues: {
            title: '',
            description: '',
            releaseDate: '',
            actorIds: [],
            directorIds: [],
            categoryIds: [],
            country: '',
            trailerUrl: '',
            verticalPoster: '',
            horizontalPoster: '',
            age: AgeRank.P,
            isVip: false
        }
    })

    const onReset = () => {
        if (isCreateMovieLoading) return
        form.reset()
        setVideoFile(null)
    }

    const onSubmit = async (data: CreateMovieBodyType) => {
        if (isCreateMovieLoading) return

        try {
            await createMovieMutate(data).unwrap()
            toast.success(t('messages.uploadSuccess'))
            onReset()
        } catch (error) {
            console.error('Error creating movie:', error)
            handleFormError({ error, setFormError: form.setError })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={onReset} method='POST' className='space-y-10 p-6'>
                <VideoPicker
                    onFileSelect={setVideoFile}
                    file={videoFile}
                    onReset={onReset}
                    setIsInitialRender={setIsInitialRender}
                    viewMode={isInitialRender ? UploadVideoViewMode.INITIAL : UploadVideoViewMode.FILE_SELECTED}
                    className='mb-8'
                    title={uploadTrailer('selectFile')}
                    description={uploadTrailer('draganddrop')}
                    selectButton={uploadTrailer('selectButton')}
                />

                {!isInitialRender && (
                    <>
                        <div className='flex flex-row gap-10 items-start justify-start'>
                            <FormField
                                control={form.control}
                                name='verticalPoster'
                                render={({ formState }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel className='font-semibold text-sm'>
                                            {t('verticalPoster')}
                                            <span className='text-red-500'>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <PosterPicker className='h-[250px] aspect-video' />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.title?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='horizontalPoster'
                                render={({ formState }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel className='font-semibold text-sm'>
                                            {t('horizontalPoster')} <span className='text-red-500'>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <PosterPicker className='h-[250px] aspect-9/16' />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.title?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex flex-row items-start gap-2'>
                            <FormField
                                control={form.control}
                                name='country'
                                render={({ field, formState }) => {
                                    return (
                                        <FormItem className='flex flex-col gap-2 flex-1'>
                                            <FormLabel className='font-semibold text-sm'>
                                                {t('country')}
                                                <span className='text-red-500'>*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    key={field.value}
                                                    value={field.value || ''}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='bg-background w-full truncate'>
                                                        <SelectValue placeholder={t('selectCountry')} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {countries.map((c) => (
                                                            <SelectItem key={c.code} value={c.code}>
                                                                <span className='mr-2'>
                                                                    {c.code
                                                                        .toLowerCase()
                                                                        .split('')
                                                                        .map((char) =>
                                                                            String.fromCodePoint(
                                                                                0x1f1e6 + char.charCodeAt(0) - 97
                                                                            )
                                                                        )
                                                                        .join('')}
                                                                </span>
                                                                {c.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className='text-xs text-red-500 mt-1'>
                                                {getLocaleMessage(validMessage, formState.errors.country?.message)}
                                            </FormMessage>
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={form.control}
                                name='age'
                                render={({ field, formState }) => (
                                    <FormItem className='flex flex-col gap-2 flex-1'>
                                        <FormLabel className='font-semibold text-sm'>
                                            {t('ageRank')}
                                            <span className='text-red-500'>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value.toString()}
                                                onValueChange={(v) => field.onChange(Number(v))}
                                            >
                                                <SelectTrigger className=' bg-background truncate w-full'>
                                                    <SelectValue placeholder={t('selectAgeRank')} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.values(AgeRank)
                                                        .filter((v) => typeof v === 'number')
                                                        .map((v) => (
                                                            <SelectItem key={v} value={String(v)}>
                                                                {getAgeRankNameFromEnum(v as AgeRank)}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.age?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='directorIds'
                                render={({ field, formState }) => (
                                    <FormItem className='flex flex-col  gap-2 flex-1 '>
                                        <FormLabel className='font-semibold text-sm '>{t('director')}</FormLabel>
                                        <FormControl>
                                            <ComboboxMultiSelect
                                                options={directors.map((d) => ({ value: d.id, label: d.fullname }))}
                                                selectedValues={field.value}
                                                onSelectedValuesChange={field.onChange}
                                                placeholder={t('selectDirector')}
                                                className='w-full'
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.directorIds?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='actorIds'
                                render={({ field, formState }) => (
                                    <FormItem className='flex flex-col  gap-2 flex-1'>
                                        <FormLabel className='font-semibold text-sm '>{t('actors')}</FormLabel>
                                        <FormControl>
                                            <ComboboxMultiSelect
                                                options={actors.map((a) => ({ value: a.id, label: a.fullname }))}
                                                selectedValues={field.value}
                                                onSelectedValuesChange={field.onChange}
                                                placeholder={t('selectActors')}
                                                className='w-full'
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.actorIds?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='categoryIds'
                                render={({ field, formState }) => (
                                    <FormItem className='flex flex-col  gap-2 flex-1'>
                                        <FormLabel className='font-semibold text-sm '>{t('genres')}</FormLabel>
                                        <FormControl>
                                            <ComboboxMultiSelect
                                                options={genres.map((g) => ({ value: g.id, label: g.name }))}
                                                selectedValues={field.value}
                                                onSelectedValuesChange={field.onChange}
                                                placeholder={t('selectGenres')}
                                                className='w-full'
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.categoryIds?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='isVip'
                                render={({ field, formState }) => (
                                    <FormItem className='flex flex-col  gap-2 flex-1'>
                                        <FormLabel className='font-semibold text-sm cursor-pointer'>VIP</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className='data-[state=checked]:bg-brand data-[state=checked]:border-brand'
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.categoryIds?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='grid grid-cols-[5fr_1fr] gap-6 '>
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field, formState }) => (
                                    <FormItem>
                                        <FormLabel className='font-semibold text-sm'>
                                            {t('title')}
                                            <span className='text-red-500'>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('titlePlaceholder')} {...field} />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.title?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='releaseDate'
                                render={({ field, formState }) => (
                                    <FormItem>
                                        <FormLabel className='font-semibold text-sm'>
                                            {t('dateRealease')}
                                            <span className='text-red-500'>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type='date' {...field} />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {getLocaleMessage(validMessage, formState.errors.releaseDate?.message)}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field, formState }) => {
                                    return (
                                        <FormItem className='col-span-2 flex flex-col gap-2'>
                                            <FormLabel className='font-semibold text-sm'>
                                                {t('description')}
                                                <span className='text-red-500'>*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <Textarea
                                                        className='w-full min-h-[120px] border rounded-md p-3 resize-none overflow-hidden'
                                                        placeholder={t('descriptionPlaceholder')}
                                                        {...field}
                                                    />
                                                    <span
                                                        className={cn(
                                                            'absolute -bottom-6 right-3 text-xs text-muted-foreground',
                                                            {
                                                                'text-red-500': formState.errors.description?.message
                                                            }
                                                        )}
                                                    >
                                                        {field.value?.length || 0} / {MAX_DESC_LENGTH}
                                                    </span>
                                                </div>
                                            </FormControl>
                                            <FormMessage className='text-xs text-red-500 mt-1'>
                                                {getLocaleMessage(validMessage, formState.errors.description?.message)}
                                            </FormMessage>
                                        </FormItem>
                                    )
                                }}
                            />
                        </div>

                        <div className='flex gap-4 justify-start pt-10 '>
                            <Button
                                type='submit'
                                disabled={isCreateMovieLoading}
                                className='w-[180px] h-10 font-medium hover:cursor-pointer rounded-lg'
                            >
                                {isCreateMovieLoading ? <Loader className='animate-spin' /> : t('uploadButton')}
                            </Button>

                            <Button
                                type='button'
                                variant='secondary'
                                disabled={isCreateMovieLoading}
                                onClick={onReset}
                                className='w-[180px] h-10  hover:cursor-pointer  rounded-lg'
                            >
                                {t('resetButton')}
                            </Button>
                        </div>
                    </>
                )}
            </form>
        </Form>
    )
}
