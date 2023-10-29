import { PersonTypes } from './person-types'

export type Message = {
    id: number
    attendanceId: number
    sender: PersonTypes
    content: string
    createdAt: string
}