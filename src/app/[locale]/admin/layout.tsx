'use client'

import AdminSideboard from '@/components/admin-sideboard'
import ScrollToTopButton from '@/components/scroll-to-top'

interface AdminLayoutProps {
    children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className='flex ml-60 min-h-screen'>
            <AdminSideboard
                className={`border-b-[0.3px] border-white/10`}
                buttonClassName='text-white bg-transparent hover:bg-transparent hover:text-white'
            />

            <main className='flex-1 p-6 mt-14 overflow-y-auto h-[calc(100vh-56px)]'>{children}</main>
            <ScrollToTopButton />
        </div>
    )
}
