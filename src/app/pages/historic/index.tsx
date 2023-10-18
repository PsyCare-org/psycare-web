import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { BreadcrumbItem, TemAttendances } from 'src/app/components'
import { useApi, usePerson } from 'src/app/hooks'
import { useEffect, useState } from 'react'
import { Attendance } from 'src/types'
import './styles.scss'

const breadcrumbs: BreadcrumbItem[] = [
    {
        active: false,
        label: 'Histórico',
        url: '/historic'
    }
]

export const Historic = () => {

    const { person } = usePerson()
    const { get } = useApi()
    const navigate = useNavigate()

    const [attendances, setAttendances] = useState<Attendance[] | null>(null)

    useEffect(() => {
        get(`/attendance/${person?.type}/${person?.id}`).then(res => {
            setAttendances(res.data.closed)
        })
    }, [])

    return (
        <TemAttendances
            breadcrumbs={breadcrumbs}
            title={`Histórico de ${person?.type === 'user' ? 'Acompanhamentos' : 'Atendimentos'}`}
            subTitle={`Aqui estão registrados todos os seus ${person?.type === 'user' ? 'acompanhamentos' : 'atendimentos'} inativos ou encerrados.`}
            emptyTitle={`Nenhum histórico de ${person?.type === 'user' ? 'acompanhamento' : 'atendimento'}!`}
            emptyDescription={(
                <>
                    Você não possui nenhum histórico de acompanhamento. Considere explorar a <Link onClick={() => navigate('/professionals')}>lista de profissionais</Link> disponíveis.
                </>
            )}
            onAttendanceClick={({ id }) => navigate(`/historic/${id}`)}
            data={attendances}
        />
    )
}