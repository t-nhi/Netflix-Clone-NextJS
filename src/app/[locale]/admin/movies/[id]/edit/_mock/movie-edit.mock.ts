import { MovieStatus } from '@/constants/upload-file/movie-upload-status.enum'
import { VideoQuality } from '@/constants/video/video-quality.enum'
import { MovieType } from '@/types/models/movie_temp.model'

export const getMovieById = async (id: string): Promise<MovieType> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: id,
                title: 'Interstellar',
                description:
                    "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                status: MovieStatus.READY,
                qualities: [VideoQuality.FULL_HD, VideoQuality.HD, VideoQuality.SD],

                verticalPoster: 'poster_v_interstellar.jpg',
                horizontalPoster: 'poster_h_interstellar.jpg',
                releaseDate: '2014-11-07',
                trailerUrl: 'https://youtu.be/r5MdZVtxT7E',
                age: 13,
                year: 2014,
                country: 'VN'
            })
        }, 500)
    })
}
