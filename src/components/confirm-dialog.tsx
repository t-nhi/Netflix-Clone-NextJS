'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'

interface DialogConfirmProps {
    open: boolean
    title: string
    onClose: () => void
    onConfirm: () => void
    cancelText?: string
    confirmText?: string
}

export default function DialogConfirm({
    open,
    title,
    onClose,
    onConfirm,
    cancelText,
    confirmText
}: DialogConfirmProps) {
    const locale = useLocale()

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className='
                bg-black/10 dark:bg-white/10
                backdrop-blur-xl backdrop-saturate-150
                border border-white/20
                p-8
                text-white
                shadow-2xl shadow-black/60
                w-[90%] max-w-md
                transform scale-95
                '
            >
                <DialogHeader className='flex flex-col gap-3'>
                    <DialogTitle
                        className='
                        lg:text-[18px] md:text-[16px] text-[14px] font-semibold text-center
                        text-white
                        '
                    >
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <DialogFooter className='flex flex-row justify-center gap-4 pt-6'>
                    <Button
                        onClick={onClose}
                        className='
                        md:h-11 h-8 md:px-10 px-4 rounded-[4px]
                        bg-[#6d6d6e]/70 hover:bg-[#6d6d6e]/40
                        text-white hover:text-white 
                        transition-all duration-300 md:text-base text-[12px] font-medium cursor-pointer
                        '
                    >
                        {cancelText ?? (locale === 'vi' ? 'Hủy' : 'Cancel')}
                    </Button>

                    <Button
                        onClick={onConfirm}
                        className={`
                        md:h-11 h-8 md:px-10 px-4 rounded-[4px]
                        bg-brand hover:bg-brand/90
                        text-white 
                        md:text-base text-[12px] font-medium transition-all duration-300 cursor-pointer
                        `}
                    >
                        {confirmText ?? (locale === 'vi' ? 'Xác nhận' : 'Confirm')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
