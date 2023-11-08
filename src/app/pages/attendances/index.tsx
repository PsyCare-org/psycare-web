import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TemAttendances } from 'src/app/components'
import { useApi, usePerson } from 'src/app/hooks'
import { Attendance, Person } from 'src/types'
import './styles.scss'
import { AttendancesPending } from './components/pending'
import { useChildProps } from './hooks/useChildProps'

export const Attendances = () => {

    const { get } = useApi()
    const { person } = usePerson()
    const navigate = useNavigate()

    const props = useChildProps()[(person as Person).type]

    const [pendingAttendances, setPendingAttendances] = useState<Attendance[]>([])
    const [attendances, setAttendances] = useState<Attendance[] | null>(null)

    const loadData = () => {
        get(`/attendance/${person?.type}/${person?.id}/list`).then(res => {
            setAttendances(res.data.active)
            setPendingAttendances(res.data.pending)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <TemAttendances
            { ...props }
            { ...pendingAttendances.length > 0 && {
                headButton: <AttendancesPending data={pendingAttendances} reload={loadData} />
            }}
            showDailyCalendar={true}
            data={attendances}
            onAttendanceClick={({ id }) => navigate(`/attendances/${id}`)}
        />
    )
}