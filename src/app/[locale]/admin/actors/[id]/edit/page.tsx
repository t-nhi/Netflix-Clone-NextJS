import EditActorForm from '@/app/[locale]/admin/actors/[id]/edit/_components/edit-actor-form'
import { use } from 'react'

export default function EditActorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    return <EditActorForm id={id} />
}
