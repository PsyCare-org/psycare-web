import { Link } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BreadcrumbItem, TemAttendances } from 'src/app/components'
import { Attendance } from 'src/types'
import { PatientsPending } from './pending'
import { useApi, usePerson } from 'src/app/hooks'

const breadcrumbs: BreadcrumbItem[] = [
    {
        active: false,
        label: 'Pacientes',
        url: '/patients'
    }
]

export const Patients = () => {

    const navigate = useNavigate()
    const { get } = useApi()
    const { person } = usePerson()

    const [pendingAttendances, setPendingAttendances] = useState<Attendance[]>([])
    const [attendances, setAttendances] = useState<Attendance[] | null>(null)

    const loadData = () => {
        get(`/attendance/${person?.type}/${person?.id}`).then(res => {
            setAttendances(res.data.active)
            setPendingAttendances(res.data.pending)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <TemAttendances
            breadcrumbs={breadcrumbs}
            title='Pacientes'
            subTitle='Aqui estão todos os atendimentos ativos que você, como profissional, está atualmente cuidando. Este é o seu espaço para acompanhar o progresso e fornecer o melhor suporte aos seus pacientes.'
            emptyTitle='Nenhum Paciente Ativo'
            emptyDescription={(
                <>
                    Atualmente, não há pacientes com acompanhamentos ativos em sua lista. Para iniciar um acompanhamento com um novo paciente, confira a lista de solicitações de acompanhamento pendentes. Certifique-se de manter o <Link onClick={() => navigate('/profile')}>seu perfil</Link> na plataforma atualizado.
                </>
            )}
            data={attendances}
            onAttendanceClick={({ id }) => navigate(`/patient/${id}`)}
            headButton={(
                <PatientsPending 
                    data={pendingAttendances}
                    reload={loadData}
                />
            )}
        />
    )
}