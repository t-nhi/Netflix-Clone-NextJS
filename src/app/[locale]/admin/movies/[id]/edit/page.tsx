import { use } from 'react'
import EditMovieForm from './_components/edit-movie-form'

export default function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    return <EditMovieForm id={id} />
}
