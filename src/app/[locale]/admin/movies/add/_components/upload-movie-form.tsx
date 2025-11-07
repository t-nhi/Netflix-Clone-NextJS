'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import Select, { MultiValue } from 'react-select'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select as ShadSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { CreateFilmReqBody, CreateFilmReqBodyType } from '@/utils/validation/upload-film.validation'
import { getMockActors } from '@/app/[locale]/admin/_mock/actors.mock'
import { getMockDirectors } from '@/app/[locale]/admin/_mock/directors.mock'
import { getMockCategories } from '@/app/[locale]/admin/_mock/categories.mock'

import { AgeRank, Quality } from '@/app/constants/enums'
import { getAgeRankNameFromEnum, getQualityNameFromEnum } from '@/helper/getNameFromStatus'
import UploadVideo from '@/app/[locale]/admin/movies/add/_components/upload-trailer'
import PosterUploadField from '@/app/[locale]/admin/movies/add/_components/upload-poster'
import { CountrySelect } from '@/app/[locale]/admin/movies/add/_components/contries-select'

export default function FormUploadTrailer() {
    const t = useTranslations('AdminPage.uploadFilm.uploadForm')
    const validMessage = useTranslations('AdminPage.uploadFilm.validation')
    const MAX_DESC_LENGTH = 5000
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isInitialRender, setIsInitialRender] = useState(true)
    const [videoFile, setVideoFile] = useState<File | null>(null)

    const [directors, setDirectors] = useState<{ _id: string; name: string }[]>([])
    const [actors, setActors] = useState<{ _id: string; name: string }[]>([])
    const [genres, setGenres] = useState<{ _id: string; name: string }[]>([])

    useEffect(() => {
        setActors(getMockActors(20).map((a) => ({ _id: a.id, name: a.fullName })))
        setDirectors(getMockDirectors(5).map((d) => ({ _id: d.id, name: d.fullName })))
        setGenres(getMockCategories(10).map((g) => ({ _id: g.id, name: g.name })))
    }, [])

    const form = useForm<CreateFilmReqBodyType>({
        resolver: zodResolver(CreateFilmReqBody),
        defaultValues: {
            title: '',
            description: '',
            release_date: '',
            directors: [],
            actors: [],
            genres: [],
            country: '',
            trailer_url: '',
            vertical_poster: '',
            horizontal_poster: '',
            age: AgeRank.P,
            quality: Quality.HD,
            duration_minutes: 120,
            film_url: '',
            isVip: false
        }
    })

    const onReset = () => {
        if (isSubmitting) return
        form.reset()
        setVideoFile(null)
        setIsInitialRender(true)
        toast.success(t('messages.resetForm'))
    }

    const onSubmit = async (data: CreateFilmReqBodyType) => {
        if (isSubmitting) return
        setIsSubmitting(true)

        try {
            console.log('Data to submit:', data)
            toast.success(t('messages.uploadSuccess'))
            onReset()
        } catch (error) {
            console.error(error)
            toast.error(t('messages.uploadFailed'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10 p-6'>
                <UploadVideo
                    onFileSelect={setVideoFile}
                    file={videoFile}
                    onReset={onReset}
                    setIsInitialRender={setIsInitialRender}
                    isInitialRender={isInitialRender}
                    className='mb-8'
                />

                {!isInitialRender && (
                    <>
                        <div className='flex flex-row gap-40 items-start justify-start'>
                            <PosterUploadField
                                control={form.control}
                                formState={form.formState}
                                name='vertical_poster'
                                label={t('verticalPoster')}
                                aspectRatio='3/4'
                                className='h-[250px]'
                            />

                            <PosterUploadField
                                control={form.control}
                                formState={form.formState}
                                name='horizontal_poster'
                                label={t('horizontalPoster')}
                                aspectRatio='16/9'
                                className='h-[250px]'
                            />
                        </div>

                        <div className='grid grid-cols-[5fr_1fr] gap-6 py-10'>
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='font-semibold text-sm'>{t('title')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('titlePlaceholder')} {...field} />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {form.formState.errors.title?.message &&
                                                validMessage(form.formState.errors.title.message as 'titleRequired')}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='release_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='font-semibold text-sm'>{t('dateRealease')}</FormLabel>
                                        <FormControl>
                                            <Input type='date' {...field} />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {form.formState.errors.release_date?.message &&
                                                validMessage(
                                                    form.formState.errors.release_date.message as 'releaseDateInvalid'
                                                )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => {
                                    const currentLength = field.value?.length || 0
                                    return (
                                        <FormItem className='col-span-2'>
                                            <FormLabel className='font-semibold text-sm'>{t('description')}</FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <textarea
                                                        className='w-full min-h-[120px] border rounded-md p-3 resize-none overflow-hidden'
                                                        placeholder={t('descriptionPlaceholder')}
                                                        maxLength={MAX_DESC_LENGTH}
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e)
                                                            e.target.style.height = 'auto'
                                                            e.target.style.height = `${e.target.scrollHeight}px`
                                                        }}
                                                    />
                                                    <span className='absolute -bottom-4 right-3 text-xs text-muted-foreground'>
                                                        {currentLength} / {MAX_DESC_LENGTH}
                                                    </span>
                                                </div>
                                            </FormControl>
                                            <FormMessage className='text-xs text-red-500 mt-1'>
                                                {form.formState.errors.description?.message &&
                                                    validMessage(
                                                        form.formState.errors.description.message as
                                                            | 'descriptionRequired'
                                                            | 'descriptionMaxLength'
                                                    )}
                                            </FormMessage>
                                        </FormItem>
                                    )
                                }}
                            />
                        </div>

                        <div className='grid grid-cols-3 gap-6 items-start py-5'>
                            <FormField
                                control={form.control}
                                name='directors'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col self-start min-h-[120px]'>
                                        <FormLabel className='font-semibold text-sm mb-1'>{t('director')}</FormLabel>
                                        <FormControl>
                                            <Select
                                                isMulti
                                                instanceId='directors'
                                                placeholder={t('selectDirector')}
                                                classNamePrefix='react-select'
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        minHeight: 44,
                                                        borderColor: '#e2e8f0'
                                                    }),
                                                    valueContainer: (base) => ({
                                                        ...base,
                                                        overflow: 'hidden'
                                                    }),
                                                    multiValueLabel: (base) => ({
                                                        ...base,
                                                        whiteSpace: 'nowrap'
                                                    })
                                                }}
                                                options={directors.map((d) => ({ value: d._id, label: d.name }))}
                                                value={directors
                                                    .filter((d) => field.value?.includes(d._id))
                                                    .map((d) => ({ value: d._id, label: d.name }))}
                                                onChange={(vals: MultiValue<{ value: string }>) =>
                                                    field.onChange(vals.map((v) => v.value))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {form.formState.errors.directors?.message &&
                                                validMessage(
                                                    form.formState.errors.directors.message as 'directorsRequired'
                                                )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='actors'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col self-start min-h-[120px]'>
                                        <FormLabel className='font-semibold text-sm mb-1'>{t('actors')}</FormLabel>
                                        <FormControl>
                                            <Select
                                                isMulti
                                                instanceId='actors'
                                                placeholder={t('selectActors')}
                                                classNamePrefix='react-select'
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        minHeight: 44,
                                                        borderColor: '#e2e8f0'
                                                    }),
                                                    valueContainer: (base) => ({
                                                        ...base,
                                                        overflow: 'hidden'
                                                    }),
                                                    multiValueLabel: (base) => ({
                                                        ...base,
                                                        whiteSpace: 'nowrap'
                                                    })
                                                }}
                                                options={actors.map((a) => ({ value: a._id, label: a.name }))}
                                                value={actors
                                                    .filter((a) => field.value?.includes(a._id))
                                                    .map((a) => ({ value: a._id, label: a.name }))}
                                                onChange={(vals: MultiValue<{ value: string }>) =>
                                                    field.onChange(vals.map((v) => v.value))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {form.formState.errors.actors?.message &&
                                                validMessage(form.formState.errors.actors.message as 'actorsRequired')}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='genres'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col self-start min-h-[120px]'>
                                        <FormLabel className='font-semibold text-sm mb-1'>{t('genres')}</FormLabel>
                                        <FormControl>
                                            <Select
                                                isMulti
                                                instanceId='genres'
                                                placeholder={t('selectGenres')}
                                                classNamePrefix='react-select'
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        minHeight: 44,
                                                        borderColor: '#e2e8f0'
                                                    }),
                                                    valueContainer: (base) => ({
                                                        ...base,
                                                        overflow: 'hidden'
                                                    }),
                                                    multiValueLabel: (base) => ({
                                                        ...base,
                                                        whiteSpace: 'nowrap'
                                                    })
                                                }}
                                                options={genres.map((g) => ({ value: g._id, label: g.name }))}
                                                value={genres
                                                    .filter((g) => field.value?.includes(g._id))
                                                    .map((g) => ({ value: g._id, label: g.name }))}
                                                onChange={(vals: MultiValue<{ value: string }>) =>
                                                    field.onChange(vals.map((v) => v.value))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {form.formState.errors.genres?.message &&
                                                validMessage(form.formState.errors.genres.message as 'genresRequired')}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start py-5'>
                            <div className='flex flex-col gap-2'>
                                <CountrySelect
                                    control={form.control}
                                    formState={form.formState}
                                    name='country'
                                    label={t('country')}
                                    placeholder={t('selectCountry')}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name='age'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-2'>
                                        <FormLabel className='font-semibold text-sm'>{t('ageRank')}</FormLabel>
                                        <FormControl>
                                            <ShadSelect
                                                value={String(field.value)}
                                                onValueChange={(v) => field.onChange(Number(v))}
                                            >
                                                <SelectTrigger className='h-10 truncate'>
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
                                            </ShadSelect>
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {form.formState.errors.age?.message &&
                                                validMessage(form.formState.errors.age.message as 'ageRequired')}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='quality'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-2'>
                                        <FormLabel className='font-semibold text-sm'>{t('quality')}</FormLabel>
                                        <FormControl>
                                            <ShadSelect value={field.value} onValueChange={(v) => field.onChange(v)}>
                                                <SelectTrigger className='h-10 truncate'>
                                                    <SelectValue placeholder={t('selectQuality')} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.values(Quality).map((v) => (
                                                        <SelectItem key={v} value={v}>
                                                            {getQualityNameFromEnum(v)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </ShadSelect>
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {form.formState.errors.quality?.message &&
                                                validMessage(
                                                    form.formState.errors.quality.message as 'qualityRequired'
                                                )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='duration_minutes'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-2'>
                                        <FormLabel className='font-semibold text-sm'>{t('duration')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                min='1'
                                                placeholder='120'
                                                className='h-10'
                                                value={field.value ?? ''}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === '' ? undefined : Number(e.target.value)
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 mt-1'>
                                            {form.formState.errors.duration_minutes?.message &&
                                                validMessage(
                                                    form.formState.errors.duration_minutes.message as
                                                        | 'durationInvalid'
                                                        | 'durationMin'
                                                )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='isVip'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col justify-center h-full ml-10'>
                                        <div className='flex items-center gap-2 mt-4'>
                                            <FormControl>
                                                <input
                                                    type='checkbox'
                                                    checked={field.value}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                    className='w-4 h-4 accent-brand cursor-pointer'
                                                />
                                            </FormControl>
                                            <FormLabel className='font-semibold text-sm cursor-pointer'>VIP</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex gap-4 justify-center py-10'>
                            <Button
                                type='submit'
                                disabled={isSubmitting}
                                className='w-[180px] h-10 font-medium hover:cursor-pointer rounded-[4px]'
                            >
                                {isSubmitting ? <Loader className='animate-spin' /> : t('uploadButton')}
                            </Button>

                            <Button
                                type='button'
                                variant='secondary'
                                disabled={isSubmitting}
                                onClick={onReset}
                                className='w-[180px] h-10  hover:cursor-pointer  rounded-[4px]'
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
