'use client'

import { EditToggleButton } from '@/components/edit-toggle-button'
import { SelectAllCheckbox } from '@/components/select-all-checkbox'
import DialogConfirm from '@/components/confirm-dialog'
import { ArrowLeft, Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

interface FavoriteHeadProps {
    isEditing: boolean
    setIsEditing: (val: boolean) => void
    selectedMovies: string[]
    setSelectedMovies: (val: string[]) => void
    onSelectAll?: () => void
    allSelected?: boolean
    onReloadList: () => void
}

export default function FavoriteHead({
    isEditing,
    setIsEditing,
    selectedMovies,
    setSelectedMovies,
    onSelectAll,
    allSelected,
    onReloadList
}: FavoriteHeadProps) {
    const t = useTranslations('FavoritePage')
    const tDialog = useTranslations('RemoveToggle')
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const handleDelete = () => {
        if (selectedMovies.length === 0) {
            toast.error(tDialog('noSelected'), { duration: 4000 })
            return
        }
        setOpen(true)
    }

    const handleConfirm = () => {
        toast.success(t('messages.deleteSuccess'), { duration: 4000 })
        setSelectedMovies([])
        setIsEditing(false)
        setOpen(false)
        onReloadList()
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
        if (!isEditing) {
            setSelectedMovies([])
        }
    }

    return (
        <div className='w-full px-6 md:px-10 lg:px-14 md:pt-10 pt-3'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10 md:gap-4 flex-wrap w-full'>
                <div className='flex items-center md:gap-4 gap-1'>
                    <Link
                        href={'/films'}
                        className='flex items-center justify-center md:w-10 md:h-10 sm:w-9 sm:h-9 w-8 h-8 rounded-lg
                        bg-transparent dark:text-white text-black transition-all duration-200 hover:scale-105'
                    >
                        <ArrowLeft className='md:w-6 md:h-6 sm:w-5 sm:h-5 w-4 h-4' />
                    </Link>

                    <div className='border-l-2 border-red-600 dark:border-red-500 pl-4'>
                        <h1 className='text-[16px] md:text-lg lg:text-2xl font-bold text-black dark:text-white leading-tight'>
                            {t('title')}
                        </h1>
                    </div>
                </div>

                <div className='flex items-center sm:justify-end justify-start gap-2 w-full sm:w-auto flex-shrink-0'>
                    <div className='relative group flex-1 min-w-[180px] sm:min-w-[240px] md:min-w-[300px] lg:min-w-[400px] max-w-[550px]'>
                        <Search
                            className='absolute left-2 top-1/2 -translate-y-1/2
                                        w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400 transition-all duration-300
                                        group-hover:text-black dark:group-hover:text-white
                                        group-focus-within:text-black dark:group-focus-within:text-white'
                        />

                        <input
                            type='text'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={t('searchFavorites')}
                            className='w-full bg-transparent text-gray-900 dark:text-white text-sm
                                    border-b border-gray-400/30 dark:border-gray-500/30
                                    outline-none py-2 px-10 focus:border-transparent peer'
                        />

                        {searchValue && (
                            <button
                                onClick={() => setSearchValue('')}
                                className='absolute right-2 top-1/2 -translate-y-1/2
                                        text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white
                                        transition-all duration-200 opacity-90 hover:opacity-100'
                                aria-label='Clear search'
                            >
                                <X className='w-4 h-4 md:w-5 md:h-5' />
                            </button>
                        )}

                        <span
                            className='absolute left-1/2 bottom-0 h-[1.5px]
                                    bg-black dark:bg-white w-0 group-focus-within:w-full
                                    transition-all duration-300 ease-out origin-center transform -translate-x-1/2'
                        />
                    </div>

                    <EditToggleButton
                        isEditing={isEditing}
                        hasSelected={selectedMovies.length > 0}
                        onToggleEdit={toggleEditMode}
                        onDelete={handleDelete}
                        editTooltip={t('editFavorites')}
                        deleteTooltip={t('tooltip.removeFromList')}
                    />
                </div>
            </div>

            <div className='mt-10 min-h-[40px] flex items-center justify-start'>
                {isEditing && onSelectAll && (
                    <SelectAllCheckbox
                        allSelected={!!allSelected}
                        onSelectAll={onSelectAll}
                        selectedCount={selectedMovies.length}
                        selectAllText='Chọn tất cả'
                        deselectAllText='Bỏ chọn tất cả'
                    />
                )}
            </div>

            <DialogConfirm
                open={open}
                title={t('messages.confirmDelete')}
                onClose={() => setOpen(false)}
                onConfirm={handleConfirm}
            />
        </div>
    )
}
