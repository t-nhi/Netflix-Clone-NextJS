import { MovieStatus } from '@/constants/upload-file/movie-upload-status.enum'
import { VideoQuality } from '@/constants/video/video-quality.enum'
import z from 'zod'
import { ActorSchema } from './actor.model'
import { DirectorSchema } from './director.model'
import { CategorySchema } from './category.model'

export const MovieSchema = z.object({
    id: z.string(),
    title: z.string().min(1, 'titleRequired'),
    description: z.string().min(1, 'descriptionRequired').max(5000, 'descriptionMaxLength'),
    status: z.enum(MovieStatus),
    qualities: z.array(z.enum(VideoQuality)),
    verticalPoster: z.string(),
    horizontalPoster: z.string(),
    releaseDate: z.string(),
    trailerUrl: z.string(),
    age: z.number(),
    year: z.number(),
    country: z.string().min(1, 'countryRequired'),
    actors: z.array(ActorSchema),
    directors: z.array(DirectorSchema),
    categories: z.array(CategorySchema),
    isVip: z.boolean()
})

//  {
//             "id": "641714ab-d27d-4fae-90ec-ede95a8be9fe",
//             "title": "Interstellar",
//             "description": "A team of explorers travel through a wormhole to ensure humanity’s survival.",
//             "horizontalPoster": "poster_h_interstellar.jpg",
//             "verticalPoster": "poster_v_interstellar.jpg",
//             "releaseDate": "2014-11-07",
//             "trailerUrl": "https://youtu.be/zSWdZVtXT7E",
//             "age": 13,
//             "year": 2014,
//             "country": "USA",
//             "isVip": false,
//             "categories": [],
//             "actors": [],
//             "directors": []
//         },
export type MovieType = z.infer<typeof MovieSchema>

export const UpdateMovieSchema = MovieSchema.omit({
    id: true,
    status: true,
    qualities: true,
    year: true
}).extend({
    directors: z.array(z.string()).optional(),
    actors: z.array(z.string()).optional(),
    genres: z.array(z.string()).optional(),
    duration_minutes: z.number().min(1).optional(),
    isVip: z.boolean().optional()
})

export type UpdateMovieType = z.infer<typeof UpdateMovieSchema>
