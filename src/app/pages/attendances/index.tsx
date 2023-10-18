import { Link } from '@mui/material'
import { BreadcrumbItem, TemAttendances } from 'src/app/components'
import { useEffect, useState } from 'react'
import { AttendancesPending } from './pending'
import { useNavigate } from 'react-router-dom'
import { Attendance } from 'src/types'
import './styles.scss'
import { useApi, usePerson } from 'src/app/hooks'

const breadcrumbs: BreadcrumbItem[] = [
    {
        active: false,
        label: 'Acompanhamentos',
        url: '/attendances'
    }
]

export const Attendances = () => {

    const { get } = useApi()
    const { person } = usePerson()
    const navigate = useNavigate()

    const [pendingAttendances, setPendingAttendances] = useState<Attendance[]>([])
    const [attendances, setAttendances] = useState<Attendance[] | null>(null)

    useEffect(() => {
        get(`/attendance/${person?.type}/${person?.id}`).then(res => {
            setAttendances(res.data.active)
            setPendingAttendances(res.data.pending)
        })
    }, [])

    return (
        <TemAttendances
            breadcrumbs={breadcrumbs}
            title='Acompanhamentos'
            subTitle='Aqui você encontra informações sobre os seus acompanhamentos em andamento e as solicitações pendentes.'
            emptyTitle='Nenhum Acompanhamento Ativo!'
            emptyDescription={(
                <>
                    Você não possui nenhum acompanhamento ativo no momento. Considere explorar a <Link onClick={() => navigate('/professionals')}>lista de profissionais</Link> disponíveis ou verificar o <Link onClick={() => navigate('/historic')}>histórico de acompanhamentos</Link> anteriores.
                </>
            )}
            headButton={(
                <AttendancesPending data={pendingAttendances} />
            )}
            data={attendances}
            onAttendanceClick={({ id }) => navigate(`/attendances/${id}`)}
        />
    )
}