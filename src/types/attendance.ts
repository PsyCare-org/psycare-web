import { AttendanceStatus } from 'src/enums'
import { CalendarHour } from './calendar-hour'
import { Professional } from './professional'
import { User } from './user'
import { Rating } from './rating'

export type Attendance = {
    id: number
    status: AttendanceStatus
    calendarHour: CalendarHour
    professional: Professional
    professionalId: number
    user: User
    userId: number
    meetingsCount?: number
    rating?: Rating
    createdAt: string
}