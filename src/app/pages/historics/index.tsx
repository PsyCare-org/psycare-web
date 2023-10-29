import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { BreadcrumbItem, TemAttendances } from 'src/app/components'
import { useApi, usePerson } from 'src/app/hooks'
import { useEffect, useState } from 'react'
import { Attendance, Person } from 'src/types'
import './styles.scss'
import { useChildProps } from './hooks/useChildProps'

const breadcrumbs: BreadcrumbItem[] = [
    {
        active: false,
        label: 'Histórico',
        url: '/historics'
    }
]

export const Historics = () => {

    const { person } = usePerson()
    const { get } = useApi()
    const navigate = useNavigate()

    const [attendances, setAttendances] = useState<Attendance[] | null>(null)

    const props = useChildProps()[(person as Person).type]

    useEffect(() => {
        get(`/attendance/${person?.type}/${person?.id}/list`).then(res => {
            setAttendances(res.data.closed)
        })
    }, [])

    return (
        <TemAttendances
            { ...props }
            breadcrumbs={breadcrumbs}
            onAttendanceClick={({ id }) => navigate(`/historics/${id}`)}
            data={attendances}
        />
    )
}