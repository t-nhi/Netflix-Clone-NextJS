import { z } from 'zod'

export const MovieSchema = z.object({
    id: z.string(),
    title: z.string(),
    title_other: z.string(),
    release_date: z.string(),
    description: z.string(),
    vertical_poster: z.string(),
    horizontal_poster: z.string(),
    genres: z.array(z.string()),
    trailer_url: z.string(),
    age: z.number(),
    views_count: z.number(),
    rating: z.number(),
    year: z.number(),
    country: z.string(),
    quality: z.string(),
    duration_minutes: z.number(),
    actors: z.array(z.string()),
    directors: z.array(z.string()),
    category: z.string(),
    comments_count: z.number(),
    film_url: z.string().optional(),
    watch_duration_minutes: z.number(),
    watched_at: z.string(),
    rank: z.number(),
    tags: z.array(z.string()).optional(),
    created_at: z.string(),
    updated_at: z.string(),
    like_count: z.number(),
    share_count: z.number(),
    isVip: z.boolean()
})

export type MovieType = z.infer<typeof MovieSchema>
