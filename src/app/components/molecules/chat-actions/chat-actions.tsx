import { IconButton, TextField } from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { useEffect, useState } from 'react'
import { Attendance } from 'src/types'
import { useApi, usePerson } from 'src/app/hooks'
import './chat-actions.scss'

type Props = {
    attendance: Attendance
}

export const MolChatActions = ({ attendance }: Props) => {

    const { post } = useApi()
    const { person } = usePerson()

    const [newMessage, setNewMessage] = useState<string>('')

    const sendMessage = () => {
        const payload = {
            attendanceId: attendance.id,
            sender: person?.type,
            content: newMessage
        }

        post('/message', payload).then(() => setNewMessage(''))
    }

    useEffect(() => {
        setNewMessage('')
    }, [attendance])

    return (
        <div id='mol-chat-actions'>
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
    )
}