import { Attendance } from './attendance'

export type OccupiedHour = Pick<Attendance, 'calendarHour' | 'userId'>