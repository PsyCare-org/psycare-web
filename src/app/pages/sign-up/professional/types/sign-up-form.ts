import { Gender } from 'src/enums/gender'
import { ProfessionalType } from 'src/enums/professional-type'

export type SignUpForm = {
    cpf: string
    crp: string
    email: string
    password: string
    confirmPassword: string
    phoneNumber?: string
    name: string
    surname?: string
    gender: Gender
    birthDate: any
    type: ProfessionalType
    languages: string[]
    abstract: string
}