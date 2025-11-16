'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeft, Loader } from 'lucide-react'
import Select, { MultiValue } from 'react-select'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select as ShadSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

import { getMockActors } from '@/app/[locale]/admin/_mock/actors.mock'
import { getMockDirectors } from '@/app/[locale]/admin/_mock/directors.mock'
import { getMockCategories } from '@/app/[locale]/admin/_mock/categories.mock'

import { getAgeRankNameFromEnum } from '@/helper/getNameFromStatus'
import UploadVideo from '@/app/[locale]/admin/movies/_components/video-picker'
import PosterUploadField from '@/app/[locale]/admin/movies/_components/poster-picker'
import { CountrySelect } from '@/app/[locale]/admin/movies/_components/upload-movie/contries-select'
import { UploadFileViewMode } from '@/app/[locale]/admin/movies/_components/video-picker/upload-video'
import { AgeRank } from '@/constants/movie/age-rank.enum'
import FileInfo from '@/app/[locale]/admin/movies/_components/video-picker/file-info'
import VideoPreview from '@/app/[locale]/admin/movies/_components/video-picker/video-preview'
import Link from 'next/link'
import { MovieType, UpdateMovieSchema, UpdateMovieType } from '@/types/models/movie_temp.model'
import { getMovieById } from '@/app/[locale]/admin/movies/edit/[id]/_mock/movie-edit.mock'
import { customSelectMultiStyles } from '@/app/[locale]/admin/movies/_components/upload-movie/custom-style-select-multi'

interface EditMovieFormProps {
    id: string
}

const updateMovie = async (id: string, data: Partial<UpdateMovieType>): Promise<void> => {
    // Mock API call delay
}

export default function EditMovieForm({ id }: EditMovieFormProps) {
    const t = useTranslations('AdminPage.uploadFilm.uploadForm')
    const validMessage = useTranslations('AdminPage.uploadFilm.validation')
    const MAX_DESC_LENGTH = 5000

    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showVideoUpload, setShowVideoUpload] = useState(false)
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [trailerFile, setTrailerFile] = useState<File | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [movieData, setMovieData] = useState<MovieType | null>(null)

    const [directors, setDirectors] = useState<{ _id: string; name: string }[]>([])
    const [actors, setActors] = useState<{ _id: string; name: string }[]>([])
    const [genres, setGenres] = useState<{ _id: string; name: string }[]>([])

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const movie = await getMovieById(id)
                setMovieData(movie)

                setActors(getMockActors(20).map((a) => ({ _id: a.id, name: a.fullName })))
                setDirectors(getMockDirectors(5).map((d) => ({ _id: d.id, name: d.fullName })))
                setGenres(getMockCategories(10).map((g) => ({ _id: g.id, name: g.name })))
            } catch (error) {
                console.error('Error loading movie data:', error)
                toast.error('Lỗi khi tải dữ liệu phim')
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [id])

    const form = useForm<UpdateMovieType>({
        resolver: zodResolver(UpdateMovieSchema),
        defaultValues: {
            title: '',
            description: '',
            releaseDate: '',
            directors: [],
            actors: [],
            genres: [],
            country: '',
            trailerUrl: '',
            verticalPoster: '',
            horizontalPoster: '',
            age: AgeRank.P,
            duration_minutes: 120,
            isVip: false
        }
    })

    useEffect(() => {
        if (movieData) {
            form.reset({
                title: movieData.title,
                description: movieData.description,
                releaseDate: movieData.releaseDate,
                country: movieData.country || '',
                trailerUrl: movieData.trailerUrl,
                verticalPoster: movieData.verticalPoster,
                horizontalPoster: movieData.horizontalPoster,
                age: movieData.age as AgeRank,
                directors: [],
                actors: [],
                genres: [],
                duration_minutes: 120,
                isVip: false
            })
        }
    }, [movieData, form])

    const onReset = () => {
        if (isSubmitting || !movieData) return
        form.reset({
            title: movieData.title,
            description: movieData.description,
            releaseDate: movieData.releaseDate,
            country: movieData.country,
            trailerUrl: movieData.trailerUrl,
            verticalPoster: movieData.verticalPoster,
            horizontalPoster: movieData.horizontalPoster,
            age: movieData.age as AgeRank,
            directors: [],
            actors: [],
            genres: [],
            duration_minutes: 120,
            isVip: false
        })
        setVideoFile(null)
        setTrailerFile(null)
        setShowVideoUpload(false)
        toast.success('Đã đặt lại về dữ liệu gốc')
    }

    const onSubmit = async (data: UpdateMovieType) => {
        if (isSubmitting) return
        setIsSubmitting(true)

        try {
            await updateMovie(id, data)
            toast.success('Cập nhật phim thành công!')
        } catch (error) {
            console.error(error)
            toast.error('Cập nhật phim thất bại!')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleReplaceFile = (newFile: File | null) => {
        if (newFile?.name !== trailerFile?.name) {
            form.setValue('trailerUrl', '')
            setTrailerFile(newFile)
        }
    }

    const handleReplay = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play()
        }
    }

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-[400px]'>
                <Loader className='animate-spin w-8 h-8' />
                <span className='ml-2'>Loading</span>
            </div>
        )
    }

    if (!movieData) {
        return (
            <div className='flex items-center justify-center min-h-[400px]'>
                <span className='text-red-500'>Không tìm thấy phim</span>
            </div>
        )
    }

    return (
        <>
            <div className='mb-6 relative'>
                <Link
                    href={'/admin/movies'}
                    className='absolute top-0 left-0 flex items-center justify-center w-10 h-10 rounded-lg bg-transparent dark:text-white text-black transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800'
                >
                    <ArrowLeft className='w-6 h-6' />
                </Link>

                <h1 className='text-2xl font-bold pl-12'>Chỉnh sửa phim</h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10 p-6 border rounded-lg bg-card'>
                    <div className='grid grid-cols-3-1 gap-6 py-6'>
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
                            name='releaseDate'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-semibold text-sm'>{t('dateRealease')}</FormLabel>
                                    <FormControl>
                                        <Input type='date' {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs text-red-500 mt-1'>
                                        {form.formState.errors.releaseDate?.message &&
                                            validMessage(
                                                form.formState.errors.releaseDate.message as 'releaseDateInvalid'
                                            )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <div className='flex flex-col gap-2'>
                            <CountrySelect
                                control={form.control}
                                formState={form.formState}
                                name='country'
                                label={t('country')}
                                placeholder={t('selectCountry')}
                            />
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => {
                            const currentLength = field.value?.length || 0
                            return (
                                <FormItem>
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

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 py-5'>
                        <FormField
                            control={form.control}
                            name='directors'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='font-semibold text-sm mb-1'>{t('director')}</FormLabel>
                                    <FormControl>
                                        <Select
                                            isMulti
                                            instanceId='directors'
                                            placeholder={t('selectDirector')}
                                            classNamePrefix='react-select'
                                            menuPortalTarget={document.body}
                                            className='react-select-container bg-white dark:bg-black text-gray-900 dark:text-gray-100 rounded border border-gray-300 dark:border-white/90'
                                            options={directors.map((d) => ({ value: d._id, label: d.name }))}
                                            value={directors
                                                .filter((d) => field.value?.includes(d._id))
                                                .map((d) => ({ value: d._id, label: d.name }))}
                                            onChange={(vals) => field.onChange(vals?.map((v: any) => v.value) ?? [])}
                                            styles={customSelectMultiStyles}
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
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='font-semibold text-sm mb-1'>{t('actors')}</FormLabel>
                                    <FormControl>
                                        <Select
                                            isMulti
                                            instanceId='actors'
                                            placeholder={t('selectActors')}
                                            classNamePrefix='react-select'
                                            menuPortalTarget={document.body}
                                            className='react-select-container bg-white dark:bg-black text-gray-900 dark:text-gray-100 rounded border border-gray-300 dark:border-white/90'
                                            options={actors.map((a) => ({ value: a._id, label: a.name }))}
                                            value={actors
                                                .filter((a) => field.value?.includes(a._id))
                                                .map((a) => ({ value: a._id, label: a.name }))}
                                            onChange={(vals) => field.onChange(vals?.map((v: any) => v.value) ?? [])}
                                            styles={customSelectMultiStyles}
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
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='font-semibold text-sm mb-1'>{t('genres')}</FormLabel>
                                    <FormControl>
                                        <Select
                                            isMulti
                                            instanceId='genres'
                                            placeholder={t('selectGenres')}
                                            menuPortalTarget={document.body}
                                            classNamePrefix='react-select'
                                            className='react-select-container bg-white dark:bg-black text-gray-900 dark:text-gray-100 rounded border border-gray-300 dark:border-white/90'
                                            options={genres.map((g) => ({ value: g._id, label: g.name }))}
                                            value={genres
                                                .filter((g) => field.value?.includes(g._id))
                                                .map((g) => ({ value: g._id, label: g.name }))}
                                            onChange={(vals) => field.onChange(vals?.map((v: any) => v.value) ?? [])}
                                            styles={customSelectMultiStyles}
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

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start py-5'>
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
                                            <SelectTrigger className='h-10'>
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
                                <FormItem className='flex flex-col justify-center h-full'>
                                    <div className='flex items-center gap-2 mt-6'>
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

                    <div className='mt-8 space-y-4'>
                        <h2 className='font-semibold text-sm'>Trailer Video</h2>

                        {!trailerFile && movieData?.trailerUrl && (
                            <div className='p-4 border rounded-lg bg-white dark:bg-black'>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4'>
                                    <div className='w-full'>
                                        <FileInfo
                                            file={new File([], 'trailer.mp4', { type: 'video/mp4' })}
                                            onReplaceFile={() => handleReplay}
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <VideoPreview videoSrc={movieData.trailerUrl} title='Trailer' ref={videoRef} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-row gap-10 items-start justify-center py-6'>
                        <PosterUploadField
                            control={form.control}
                            formState={form.formState}
                            name='vertical_poster'
                            label={t('verticalPoster')}
                            aspectRatio='3/4'
                            className='h-[250px]'
                            initialImage={movieData.verticalPoster}
                        />
                        <PosterUploadField
                            control={form.control}
                            formState={form.formState}
                            name='horizontal_poster'
                            label={t('horizontalPoster')}
                            aspectRatio='16/9'
                            className='h-[250px]'
                            initialImage={movieData.horizontalPoster}
                        />
                    </div>

                    <div className='space-y-4'>
                        <div className='flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-black'>
                            <div className='flex flex-col'>
                                <span className='font-semibold text-sm'>Tải lên video film</span>
                                <span className='text-xs text-muted-foreground'>
                                    Bật để thay thế video chính hiện tại
                                </span>
                            </div>
                            <Switch
                                checked={showVideoUpload}
                                onCheckedChange={setShowVideoUpload}
                                disabled={isSubmitting}
                            />
                        </div>

                        {showVideoUpload && (
                            <div className='p-4 border rounded-lg bg-white dark:bg-black'>
                                <UploadVideo
                                    onFileSelect={setVideoFile}
                                    file={videoFile}
                                    onReset={() => {
                                        setVideoFile(null)
                                        setShowVideoUpload(false)
                                    }}
                                    setIsInitialRender={() => {}}
                                    viewMode={videoFile ? UploadFileViewMode.FILE_SELECTED : UploadFileViewMode.INITIAL}
                                    className='mb-4'
                                />
                            </div>
                        )}
                    </div>

                    <div className='flex gap-4 justify-center py-10'>
                        <Button type='submit' disabled={isSubmitting} className='w-[180px] h-10 font-medium rounded-lg'>
                            {isSubmitting ? <Loader className='animate-spin' /> : 'Cập nhật phim'}
                        </Button>

                        <Button
                            type='button'
                            variant='secondary'
                            disabled={isSubmitting}
                            onClick={onReset}
                            className='w-[180px] h-10 rounded-lg'
                        >
                            Đặt lại
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
