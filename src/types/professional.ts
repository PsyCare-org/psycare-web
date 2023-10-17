import { Gender, Language, ProfessionalType } from 'src/enums'
import { OccupiedHour } from './occupied-hour'
import { Attendance } from './attendance'
import { Rating } from './rating'

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
    ratings?: Rating[]
    ratingCount?: number
    occupiedHours?: OccupiedHour[]
    attendances?: Attendance[]
    createdAt: string
    updatedAt: string
}