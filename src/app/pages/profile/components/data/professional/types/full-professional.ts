import { Gender } from 'src/enums'

export type FullProfessional = {
    id: number
    email: string
    phoneNumber?: string
    name: string
    surname?: string
    gender: Gender
    birthDate: string
    languages: string[]
    avatarId?: number
    abstract: string
    expericences?: string
    specializations?: string
    description?: string
    historic?: string
    createdAt: Date
    updatedAt: Date
}