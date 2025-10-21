'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'
import React from 'react'

interface EditToggleButtonProps {
    isEditing: boolean
    hasSelected: boolean
    onToggleEdit: () => void
    onDelete: () => void
    editTooltip: string
    deleteTooltip: string
}

export function EditToggleButton({
    isEditing,
    hasSelected,
    onToggleEdit,
    onDelete,
    editTooltip,
    deleteTooltip
}: EditToggleButtonProps) {
    const handleClick = () => {
        if (isEditing) {
            if (hasSelected) {
                onDelete()
            } else {
                onToggleEdit()
            }
        } else {
            onToggleEdit()
        }
    }

    const isDeleteMode = isEditing && hasSelected
    const Icon = isDeleteMode ? Trash2 : Edit
    const tooltip = isDeleteMode ? deleteTooltip : editTooltip

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    size={'icon'}
                    onClick={handleClick}
                    className={`
                        rounded-full p-0 flex-shrink-0 cursor-pointer
                        sm:w-12 sm:h-8 lg:w-14 lg:h-10 w-10 h-6
                        transition-colors duration-300
                        
                        ${
                            !isDeleteMode
                                ? 'text-black dark:text-white ' +
                                  'bg-black/5 dark:bg-white/5 ' +
                                  'hover:bg-black/10 dark:hover:bg-white/10'
                                : 'bg-brand text-white hover:bg-brand/90'
                        }
                    `}
                >
                    <Icon className='w-4 h-4 md:w-5 md:h-5' />
                </Button>
            </TooltipTrigger>
            <TooltipContent side='bottom'>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    )
}
