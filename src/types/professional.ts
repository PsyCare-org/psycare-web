import { Gender, Language, ProfessionalType } from 'src/enums'

export type Professional = {
    id: number
    email: string
    phoneNumber?: string
    name: string
    surname?: string
    gender: Gender
    birthDate: string
    avatar?: string
    avatarId?: number
    cpf: string
    crp: string
    type: ProfessionalType
    languages: Language[]
    abstract: string
    expericences: string
    specializations?: string
    description?: string
    historic?: string
    rating?: number
    ratingCount?: number
    createdAt: string
    updatedAt: string
}