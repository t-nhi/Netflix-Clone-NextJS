import UsersDataTable from '@/app/[locale]/admin/users/_components/data-table'
import UsersTable from '@/app/[locale]/admin/users/_components/users-table'
import ScrollToTopButton from '@/components/scroll-to-top'

export default function UsersPage() {
    return (
        <>
            <UsersDataTable />
            <ScrollToTopButton />
        </>
    )
}
