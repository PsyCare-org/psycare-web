import { Typography } from '@mui/material'
import { useApi, usePerson, useUtils } from 'src/app/hooks'
import { Attendance, Message } from 'src/types'
import { useEffect, useRef, useState } from 'react'
import './chat-list.scss'

type Props = {
    attendance: Attendance
    newMessage?: Message
}

export const MolChatList = ({ attendance, newMessage }: Props) => {

    const { get } = useApi()
    const { person } = usePerson()
    const { formatFullDate } = useUtils()

    const containerRef = useRef<HTMLDivElement>(null)

    const [data, setData] = useState<Message[]>([])

    useEffect(() => {
        get(`/message/${attendance.id}`).then((res) => setData(res.data))
    }, [attendance])

    useEffect(() => {
        if(newMessage)
            setData([...data, newMessage])
    }, [newMessage])

    useEffect(() => {
        if(containerRef.current)
            containerRef.current.scrollTo(0, containerRef.current.scrollHeight)
    }, [data])

    return (
        <div id='mol-chat-list' ref={containerRef}>
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