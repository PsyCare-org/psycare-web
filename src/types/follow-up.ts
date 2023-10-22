import { FollowUpType } from 'src/enums'

export type FollowUp = {
    id: number
    attendanceId: number
    title: string
    description?: string
    type: FollowUpType
    check: boolean
}