import { useEffect, useState } from 'react'
import { AtomEmpty, BreadcrumbItem, OrgChat, OrgDefault } from 'src/app/components'
import { useApi, usePerson, useQuery } from 'src/app/hooks'
import { Attendance } from 'src/types'
import { MessagesAside } from './aside'
import { Typography } from '@mui/material'
import { env } from 'src/constants'
import { io } from 'socket.io-client'
import './styles.scss'

const socket = io(env.dataWsUrl || '')

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

    const loadData = () => {
        get(`/attendance/${person?.type}/${person?.id}/messages`).then(res => {
            let attendanceId = parseInt(queryParams.get('attendanceId') as string)
            let newSelected = res.data.find((el: Attendance) => el.id === attendanceId)

            if(!newSelected) {
                newSelected = res.data[0]
                attendanceId = res.data[0].id
            }

            setData(res.data)
            socket.emit('joinRoom', attendanceId.toString())
            setSelected(newSelected)
        })
    }

    useEffect(() => {
        loadData()
        socket.connect()

        return () => {
            socket.disconnect()
        }
    }, [])

    const onChangeSelected = (value: Attendance) => {
        socket.emit('leaveRoom', selected?.id.toString())

        socket.emit('joinRoom', value.id.toString())
        setSelected(value)
    }

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
                                onSelect={onChangeSelected}
                            />

                            { selected && (
                                <OrgChat 
                                    socket={socket}
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