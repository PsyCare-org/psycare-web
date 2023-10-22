import { Note } from './note'

export type Meeting = {
    id: number
    attendanceId: number
    dateTime: string
    note?: Note
}