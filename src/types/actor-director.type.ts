export interface PersonBaseType {
    id: string
    image?: string
    fullName: string
    biography?: string
    dateOfBirth?: string
    createdAt: string
    updatedAt?: string
    type: 'actor' | 'director'
}

export interface ActorType extends PersonBaseType {
    type: 'actor'
}

export interface DirectorType extends PersonBaseType {
    type: 'director'
}
