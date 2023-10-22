import { AttendanceStatus } from 'src/enums'
import { CalendarHour } from './calendar-hour'
import { Professional } from './professional'
import { User } from './user'
import { Rating } from './rating'
import { MedicalRecord } from './medical-record'
import { FollowUp } from './follow-up'
import { Meeting } from './meeting'

export type Attendance = {
    id: number
    status: AttendanceStatus
    calendarHour: CalendarHour
    professional: Professional
    professionalId: number
    user: User
    userId: number
    rating?: Rating
    medicalRecord?: MedicalRecord
    followUps?: FollowUp[]
    meetings?: Meeting[]
    createdAt: string
}