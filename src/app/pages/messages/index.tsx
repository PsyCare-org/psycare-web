import { useEffect, useState } from 'react'
import { AtomEmpty, BreadcrumbItem, MessagePayload, OrgChat, OrgDefault } from 'src/app/components'
import { useApi, usePerson, useQuery } from 'src/app/hooks'
import { Attendance, Message } from 'src/types'
import { MessagesAside } from './aside'
import './styles.scss'
import { Typography } from '@mui/material'

const breadcrumbs: BreadcrumbItem[] = [{
    active: false,
    label: 'Mensagens',
    url: '/messages'
}]

export const Messages = () => {

    const { get } = useApi()
    const { person } = usePerson()
    const queryParams = useQuery()

    const [selected, setSelected] = useState<Attendance | null>(null)
    const [data, setData] = useState<Attendance[] | null>(null)

    useEffect(() => {
        get(`/attendance/${person?.type}/${person?.id}/messages`).then(res => {
            const attendanceId = parseInt(queryParams.get('attendanceId') as string)

            const newSelected = res.data.find((el: Attendance) => el.id === attendanceId) || res.data[0]

            setData(res.data)
            setSelected(newSelected)
        })
    }, [])

    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            <div id='messages'>
                <div id='title'>
                    <Typography variant='h4'>
                        Mensagens
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Aqui você pode visualizar e interagir com todas as mensagens relacionadas aos seus acompanhamentos.
                    </Typography>
                </div>

                <div id='content'>
                    { data && data.length === 0 && (
                        <AtomEmpty title='Nenhuma Mensagem Encontrada'>
                            No momento, não há mensagens disponíveis em sua caixa de entrada. Se você tiver acompanhamentos pendentes, ativos ou encerrados, as mensagens relacionadas a esses acompanhamentos aparecerão aqui.
                        </AtomEmpty>
                    )}

                    { data && data.length > 0 && (
                        <>
                            <MessagesAside
                                data={data}
                                selected={selected}
                                onSelect={val => setSelected(val)}
                            />

                            { selected && (
                                <OrgChat 
                                    attendance={selected}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </OrgDefault>
    )
}