import { Gender } from 'src/enums'

export type ProfileDataUserForm = {
    phoneNumber?: string
    name: string
    surname?: string
    gender: Gender
    birthDate: any
}