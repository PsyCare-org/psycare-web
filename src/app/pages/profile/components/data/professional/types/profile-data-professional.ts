import { Gender } from 'src/enums'

export type ProfileDataProfessionalForm = {
    phoneNumber?: string
    name: string
    surname?: string
    gender: Gender
    birthDate: any
    languages: string[]
    abstract: string
    expericences?: string
    specializations?: string
    description?: string
    historic?: string
}