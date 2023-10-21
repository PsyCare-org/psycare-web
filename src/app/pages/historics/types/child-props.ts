import { TemAttendancesProps } from 'src/app/components'

export type ChildProps = {
    user: Omit<TemAttendancesProps, 'data' | 'onAttendanceClick' | 'breadcrumbs'>
    professional: Omit<TemAttendancesProps, 'data' | 'onAttendanceClick' | 'breadcrumbs'>
}