import { Attendance } from 'src/types'

export type SplittedAttendances = {
    active: Attendance[]
    pending: Attendance[]
}