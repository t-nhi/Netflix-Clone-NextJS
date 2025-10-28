import { use } from 'react'
import CategoryEditPage from '@/app/[locale]/admin/categories/edit/[id]/_components/edit-category-form'

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    return <CategoryEditPage id={id} />
}
