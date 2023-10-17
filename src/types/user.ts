import { Gender } from 'src/enums'

export type User = {
    id: number
    email: string
    phoneNumber?: string
    name: string
    surname?: string
    gender: Gender
    birthDate: string
    avatar?: string
    avatarId?: number
    createdAt: string
    updatedAt: string
}