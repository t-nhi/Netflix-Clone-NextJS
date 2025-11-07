import { ActorType } from '@/types/actor-director.type'

export const actorDetail: ActorType = {
    id: 'act001',
    fullName: 'Leonardo DiCaprio',
    image: '/images/actor/actor.jpg',
    biography: 'Nam dien vien nguoi My noi tieng voi nhieu vai dien an tuong trong Titanic, Inception va The Revenant.',
    dateOfBirth: '1974-11-11',
    createdAt: '2025-10-25',
    updatedAt: '2025-10-25',
    type: 'actor'
}

const now = new Date()
const twoMonthAgo = new Date()
twoMonthAgo.setMonth(now.getMonth() - 2)

const toStartOfDay = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

const randomDate = () => {
    const options = [
        toStartOfDay(now),
        toStartOfDay(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
        toStartOfDay(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
        toStartOfDay(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)),
        toStartOfDay(twoMonthAgo)
    ]
    const randomDate = options[Math.floor(Math.random() * options.length)]
    return randomDate.toISOString().split('T')[0]
}

const actorTemplates: Partial<ActorType>[] = [
    {
        fullName: 'Leonardo DiCaprio',
        biography: 'Nam dien vien noi tieng voi vai dien trong Titanic va Inception.',
        image: '/images/actor/actor.jpg'
    },
    {
        fullName: 'Emma Stone',
        biography: 'Nu dien vien doat giai Oscar voi vai dien trong La La Land.',
        image: '/images/actor/actor.jpg'
    },
    {
        fullName: 'Robert Downey Jr.',
        biography: 'Nam dien vien duoc biet den voi vai Iron Man trong Marvel.',
        image: '/images/actor/actor.jpg'
    },
    {
        fullName: 'Scarlett Johansson',
        biography: 'Nu dien vien Black Widow cua Marvel, duoc danh gia cao ve dien xuat.',
        image: '/images/actor/actor.jpg'
    },
    {
        fullName: 'Tom Cruise',
        biography: 'Nam dien vien noi tieng voi loat phim Mission: Impossible.',
        image: '/images/actor/actor.jpg'
    },
    {
        fullName: 'Jennifer Lawrence',
        biography: 'Nu dien vien tre doat giai Oscar va dong chinh trong The Hunger Games.',
        image: '/images/actor/actor.jpg'
    },
    {
        fullName: 'Chris Hemsworth',
        biography: 'Nam dien vien nguoi Uc, noi tieng voi vai Thor trong MCU.',
        image: '/images/actor/actor.jpg'
    }
]

export const getMockActors = (count: number): ActorType[] => {
    return Array(count)
        .fill(actorDetail)
        .map((item, index) => {
            const template = actorTemplates[index % actorTemplates.length]
            return {
                ...item,
                id: `${index + 1}act${(index + 1000).toString(36)}`,
                fullName: template.fullName || actorDetail.fullName,
                image: template.image ?? '/images/actor/đefault.png',
                biography: template.biography || actorDetail.biography,
                dateOfBirth: actorDetail.dateOfBirth,
                createdAt: randomDate(),
                updatedAt: randomDate(),
                type: 'actor'
            }
        })
}

export const getMockActorById = (id: string): ActorType | undefined => {
    const actors = getMockActors(20)
    return actors.find((actor) => actor.id === id)
}
