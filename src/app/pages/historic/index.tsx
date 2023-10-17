import { Link, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BreadcrumbItem, MolAttendanceCard, OrgDefault } from 'src/app/components'
import { useApi, usePerson } from 'src/app/hooks'
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

    const { get } = useApi()
    const { person } = usePerson()
    const navigate = useNavigate()

    const [attendances, setAttendances] = useState<Attendance[] | null>(null)

    useEffect(() => {
        get(`/attendance/${person?.type}/${person?.id}`).then(res => {
            setAttendances(res.data.closed)
        })
    }, [])

    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            <div id='historic'>
                <div id='title'>
                    <Typography variant='h4'>
                        Histórico de Acompanhamentos
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Aqui estão registrados todos os seus acompanhamentos inativos ou encerrados.
                    </Typography>
                </div>

                <div id='content'>
                    { attendances && attendances.length > 0 && (
                        <div id='list'>
                            {attendances.map(attendance => (
                                <MolAttendanceCard key={attendance.id} attendance={attendance} />
                            ))}
                        </div>
                    )}

                    { attendances && attendances.length == 0 && (
                        <div id='empty'>
                            <Typography variant='h6'>
                                Nenhum Histórico de Acompanhamento!
                            </Typography>
                            <Typography variant='body1'>
                                Você não possui nenhum histórico de acompanhamento. Considere explorar a <Link onClick={() => navigate('/professionals')}>lista de profissionais</Link> disponíveis.
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </OrgDefault>
    )
}