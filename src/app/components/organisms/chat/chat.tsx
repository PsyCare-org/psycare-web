import { useEffect, useState } from 'react'
import { useApi, usePerson, useUtils } from 'src/app/hooks'
import { Attendance, Message } from 'src/types'
import { Avatar, IconButton, TextField, Typography } from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { MolAttendanceModal } from '../../molecules/attendance-modal/attendance-modal'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import './chat.scss'

type Props = {
    attendance: Attendance
    showHead?: boolean
}

export const OrgChat = ({
    attendance,
    showHead = true
}: Props) => {

    const { person } = usePerson()
    const { get, post } = useApi()
    const { formatFullDate } = useUtils()

    const otherPerson = person?.type === 'user' ? attendance.professional : attendance.user
    const otherPersonName = `${otherPerson.name} ${otherPerson.surname || ''}`

    const [messages, setMessages] = useState<Message[] | null>(null)
    const [modal, setModal] = useState<boolean>(false)
    const [newMessage, setNewMessage] = useState<string>('')

    const sendMessage = () => {
        const payload = {
            attendanceId: attendance.id,
            sender: person?.type,
            content: newMessage
        }

        post('/message', payload).then(() => {
            setNewMessage('')
        })
    }

    useEffect(() => {
        get(`/message/${attendance.id}`).then((res) => {
            setMessages(res.data)
        })
    }, [])

    return (
        <div id='org-chat'>
            {showHead && (
                <div id='head'>
                    <Avatar src={otherPerson.avatar} />

                    <Typography variant='body1'>
                        { otherPersonName }
                    </Typography>

                    <div id='spacer'></div>

                    <IconButton onClick={() => setModal(true)}>
                        <InfoOutlinedIcon />
                    </IconButton>

                    <MolAttendanceModal
                        attendance={attendance}
                        flag={modal}
                        setFlag={setModal}
                        showChatBtn={false}
                    />
                </div>
            )}

            <div id='list'>
                {messages && messages.map((message, index) => (
                    <div 
                        key={message.id}
                        className={`message ${person?.type === message.sender ? 'sended' : 'received'}`}
                    >
                        <div className='content'>
                            <Typography variant='body1'>
                                { message.content }
                            </Typography>
                        </div>

                        { messages[index + 1]?.sender !== message.sender  && (
                            <Typography variant='caption'>
                                { formatFullDate(message.createdAt) }
                            </Typography>
                        )}
                    </div>
                ))}
            </div>

            <div id='bottom'>
                <TextField
                    autoFocus
                    placeholder='Digite aqui'
                    value={newMessage}
                    onKeyDown={evt => evt.key === 'Enter' && sendMessage()}
                    onChange={evt => setNewMessage(evt.target.value)}
                />

                <IconButton
                    disabled={!newMessage}
                    onClick={sendMessage}
                    color='primary'
                >
                    <SendOutlinedIcon />
                </IconButton>
            </div>
        </div>
    )
}