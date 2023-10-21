import { TemAttendancesProps } from 'src/app/components'

export type ChildProps = {
    user: Omit<TemAttendancesProps, 'data' | 'onAttendanceClick'>
    professional: Omit<TemAttendancesProps, 'data' | 'onAttendanceClick'>
}