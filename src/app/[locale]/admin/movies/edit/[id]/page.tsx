import EditMovieForm from '@/app/[locale]/admin/movies/edit/[id]/_components/edit-movie-form'
import { use } from 'react'

export default function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    return <EditMovieForm id={id} />
}
