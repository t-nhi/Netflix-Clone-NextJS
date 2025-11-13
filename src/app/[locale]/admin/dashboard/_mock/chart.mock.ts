export type MockChartItem = {
    date: string
    watching_view: number
    favorite_count: number
    category: string
}

const CATEGORIES = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance']

function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function formatDate(d: Date) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

export function getMockChartData(days = 20, end: Date | string | undefined = undefined): MockChartItem[] {
    const endDate = end ? (typeof end === 'string' ? new Date(end) : new Date(end)) : new Date()
    endDate.setHours(0, 0, 0, 0)

    const data: MockChartItem[] = []
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(endDate)
        d.setDate(endDate.getDate() - i)
        const category = CATEGORIES[randInt(0, CATEGORIES.length - 1)]

        const base = 40 + randInt(0, 60)
        const watching_view = Math.max(0, base + randInt(-20, 30))
        const favorite_count = Math.max(0, Math.round(watching_view * (0.3 + Math.random() * 0.6)))

        data.push({
            date: formatDate(d),
            watching_view,
            favorite_count,
            category
        })
    }

    return data
}
