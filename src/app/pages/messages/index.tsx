import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { BreadcrumbItem, OrgDefault } from 'src/app/components'
import { useApi, usePerson, useQuery } from 'src/app/hooks'
import './styles.scss'

const breadcrumbs: BreadcrumbItem[] = [{
    active: false,
    label: 'Mensagens',
    url: '/messages'
}]

export const Messages = () => {

    const { get } = useApi()
    const { person } = usePerson()
    const queryParams = useQuery()

    const loadData = () => {
        console.log(queryParams.get('attendanceId'))
        get(`/attendance/${person?.type}/${person?.id}/messages`).then(res => {
            console.log(res)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            <div id='messages'>
                <div id='title'>
                    <Typography variant='h4'>
                        Mensagens
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Aqui você pode visualizar e interagir com todas as mensagens relacionadas aos seus acompanhamentos. Mantenha-se conectado com seus {person?.type === 'user' ? 'profissionais de saúde' : 'pacientes'} e mantenha um registro de suas conversas, independentemente do status do acompanhamento.
                    </Typography>
                </div>
            </div>
        </OrgDefault>
    )
}