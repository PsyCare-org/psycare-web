import { Gender, Language, ProfessionalType } from 'src/enums'
import { CalendarHour } from './calendar-hour'

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
    occupiedHours?: CalendarHour[]
    createdAt: string
    updatedAt: string
}