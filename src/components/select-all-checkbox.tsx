'use client'

import React from 'react'

interface SelectAllCheckboxProps {
    allSelected: boolean
    onSelectAll: () => void
    selectedCount: number
    selectAllText: string
    deselectAllText: string
}

export function SelectAllCheckbox({
    allSelected,
    onSelectAll,
    selectedCount,
    selectAllText,
    deselectAllText
}: SelectAllCheckboxProps) {
    return (
        <label className='flex items-center gap-2 cursor-pointer'>
            <input
                className='dark:bg-black bg-white checked:bg-gray-400 dark:checked:bg-gray-600 cursor-pointer w-4 h-4'
                type='checkbox'
                checked={allSelected}
                onChange={onSelectAll}
            />
            <span>{allSelected ? deselectAllText : selectAllText}</span>
            <span>({selectedCount})</span>
        </label>
    )
}
