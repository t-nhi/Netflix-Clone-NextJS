import { CategoryType } from '@/types/category.type'

export const categoryDetail: CategoryType = {
    id: '04hs3125hyju',
    name: 'Comedy',
    description: 'Light-hearted, made to make you laugh',
    createdAt: '2025-09-01',
    updatedAt: '2025-09-01'
}

const now = new Date()
const twoMonthAgo = new Date()
twoMonthAgo.setMonth(now.getMonth() - 2)

export const getMockCategories = (number: number): CategoryType[] => {
    const toStartOfDay = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }

    const randomDate = () => {
        const options = [
            toStartOfDay(now),
            toStartOfDay(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
            toStartOfDay(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
            toStartOfDay(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000))
        ]
        const randomDate = options[Math.floor(Math.random() * options.length)]
        return randomDate.toISOString().split('T')[0]
    }

    const categoryTemplates: Partial<CategoryType>[] = [
        { name: 'Comedy', description: 'Light-hearted, made to make you laugh' },
        { name: 'Drama', description: 'Emotional stories about real-life events' },
        { name: 'Romance', description: 'Love and relationships at the centre, with a happy ending in mind' },
        { name: 'Thriller', description: 'Suspenseful stories with unexpected twists' },
        { name: 'Action', description: 'Exciting stories with fast-paced action' },
        { name: 'Adventure', description: 'Exploration and exciting journeys' },
        { name: 'Animation', description: 'Animated stories for all ages' }
    ]

    return Array(number)
        .fill(categoryDetail)
        .map((item, index) => {
            const template = categoryTemplates[index % categoryTemplates.length]
            return {
                ...item,
                id: `${index + 1}cat${(index + 1000).toString(36)}`,
                name: template.name || categoryDetail.name,
                description: template.description || categoryDetail.description,
                createdAt: randomDate(),
                updatedAt: randomDate()
            }
        })
}

export const getMockCategoryById = (id: string): CategoryType | undefined => {
    const categories = getMockCategories(20)
    return categories.find((category) => category.id === id)
}
