import { Movie } from '@/types/models/movie.model'

export const filmDetail: Movie = {
    id: '1',
    title: 'Tiêu Minh Minh',
    title_other: 'Crime Scene Zero - 2018',
    release_date: '2025-01-01',
    description:
        'Quý Cô Ẩn Danh là một bộ phim Hình Sự Hàn Quốc được sản xuất vào năm 2025. Quý Cô Ẩn Danh (Ms. Incognito) xoay quanh Kim Young Ran, nữ vệ sĩ có xuất thân nghèo khó của chủ tập đoàn Gasung. Khi chủ tịch sắp qua đời vì bệnh, ông đề nghị ký hợp đồng hôn nhân giả với Young Ran nhằm bảo vệ tài sản của mình. Để chạy trốn những kẻ rắp tâm chiếm đoạt khoản thừa kế khổng lồ của chủ tịch, Young Ran phải thay đổi danh tính và đến làm giáo viên mẫu giáo ở một ngôi làng nhỏ. Cô nhanh chóng chinh phục được cảm tình của người dân trong làng. Người duy nhất nghi ngờ vỏ bọc hoàn hảo của Young Ran là Jeon Dong Min, một ông bố đơn thân có con trai đang học ở lớp của cô.',
    vertical_poster: '/images/home/inception-vertical.jpg',
    horizontal_poster: '/images/hero_video_poster.png',
    genres: ['Phim cổ trang', 'Hành động'],
    trailer_url: '/videos/teaser_Camuchammat.mp4',
    age: 13,

    views_count: 2704011,
    rating: 4.8,
    year: 2025,
    country: 'Trung Quốc',
    quality: 'Full HD',
    actors: [
        'Thành Nghị',
        'Cổ Lực Na Trát',
        'Lý Khải Hinh',
        'Trương Trí Lâm',
        'Từ Chấn Hiên',
        'Lữ Tụng Hiên',
        'Trần Ngọc Kỳ'
    ],
    directors: ['Nhậm Hải Đào', 'Lâm Phong'],
    category: 'Phim cổ trang',
    comments_count: 285,
    duration_minutes: 120,
    watch_duration_minutes: 10,
    watched_at: '2024-01-01T00:00:00Z',
    rank: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    like_count: 100000,
    share_count: 480000,
    isVip: true
}

const now = new Date()
const twoMonthAgo = new Date()
twoMonthAgo.setMonth(now.getMonth() - 2)

export const getMockFilms = (number: number) => {
    const toStartOfDay = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }

    const randomWatchedAt = () => {
        const options = [
            toStartOfDay(now),
            toStartOfDay(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
            toStartOfDay(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
            toStartOfDay(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000))
        ]
        const randomDate = options[Math.floor(Math.random() * options.length)]
        return randomDate.toISOString()
    }
    return Array(number)
        .fill(filmDetail)
        .map((item, index) => ({
            ...item,
            id: (index + 1).toString() + 'filmDetail',
            release_date: index % 2 === 0 ? now.toISOString() : twoMonthAgo.toISOString(),
            rank: Math.max(0, Math.floor(Math.random() * 20)),
            isVip: Math.random() < 0.5,
            watched_at: randomWatchedAt(),
            watch_duration_minutes: Math.floor(Math.random() * item.duration_minutes)
        }))
}

export const getMockFilmsWithRank = (number: number) => {
    return Array(number)
        .fill(filmDetail)
        .map((item, index) => ({
            ...item,
            id: (index + 1).toString() + 'filmDetail',
            rank: index + 1,
            release_date: index % 2 === 0 ? now.toISOString() : twoMonthAgo.toISOString(),
            isVip: Math.random() < 0.5
        }))
}
