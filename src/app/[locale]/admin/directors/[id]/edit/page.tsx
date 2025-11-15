import EditDirectorForm from '@/app/[locale]/admin/directors/[id]/edit/_components/edit-director-form'
import { use } from 'react'

export default function EditActorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    return <EditDirectorForm id={id} />
}
