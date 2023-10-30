import { Typography } from '@mui/material'
import { useApi, usePerson, useUtils } from 'src/app/hooks'
import { Attendance, Message } from 'src/types'
import { useEffect, useState } from 'react'
import './chat-list.scss'

type Props = {
    attendance: Attendance
}

export const MolChatList = ({ attendance }: Props) => {

    const { get } = useApi()
    const { person } = usePerson()
    const { formatFullDate } = useUtils()

    const [data, setData] = useState<Message[] | null>(null)

    useEffect(() => {
        get(`/message/${attendance.id}`).then((res) => {
            setData(res.data)
        })
    }, [attendance])

    return (
        <div id='mol-chat-list'>
            { data && data.map((message, index) => (
                <div
                    key={message.id}
                    className={`message ${person?.type === message.sender ? 'sended' : 'received'}`}
                >
                    <div className='content'>
                        <Typography variant='body1'>
                            {message.content}
                        </Typography>
                    </div>

                    {data[index + 1]?.sender !== message.sender && (
                        <Typography variant='caption'>
                            { formatFullDate(message.createdAt) }
                        </Typography>
                    )}
                </div>
            ))}
        </div>
    )
}