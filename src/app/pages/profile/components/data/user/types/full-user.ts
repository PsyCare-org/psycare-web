import { Gender } from 'src/enums'

export type FullUser = {
    id: number
    email: string
    phoneNumber?: string
    name: string
    surname?: string
    gender: Gender
    birthDate: string
    avatarId?: number
    createdAt: Date
    updatedAt: Date
}