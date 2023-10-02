import { Gender } from 'src/enums/gender'

export type SignUpForm = {
    email: string
    password: string
    confirmPassword: string
    phoneNumber?: string
    name: string
    surname?: string
    gender: Gender
    birthDate: any
}