export interface StatItem {
    key: string
    value: number | string
}

export const stats: StatItem[] = [
    { key: 'totalUsers', value: 270 },
    { key: 'totalMovies', value: 3298 },
    { key: 'activeSubscriptions', value: 1000 },
    { key: 'totalRevenue', value: '$23,000' },
    { key: 'ordersToday', value: 10 }
]
