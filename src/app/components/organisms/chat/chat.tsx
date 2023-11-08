import { Attendance, Message } from 'src/types'
import { MolChatHead, MolChatList, MolChatActions } from 'src/app/components'
import { Socket } from 'socket.io-client'
import { useEffect, useState } from 'react'
import './chat.scss'

type Props = {
    socket: Socket
    attendance: Attendance
    showHead?: boolean
}

export const OrgChat = ({
    socket,
    attendance,
    showHead = true
}: Props) => {

    const [newMessage, setNewMessage] = useState<Message | undefined>(undefined)

    const handleNewMessage = (value: Message) => {
        socket.emit('chatToServer', value)
    }

    useEffect(() => {
        const chatToClientEvent = (value: Message) => {
            setNewMessage(value)
        }

        socket.on('chatToClient', chatToClientEvent)

        return () => {
            socket.off('chatToClient', chatToClientEvent)
        }
    }, [])

    return (
        <div id='org-chat'>
            { showHead && <MolChatHead attendance={attendance} /> }

            { socket && (
                <>
                    <MolChatList 
                        attendance={attendance}
                        newMessage={newMessage}
                    />
        
                    <MolChatActions 
                        attendance={attendance}
                        onNewMessage={handleNewMessage}
                    />
                </>
            )}
        </div>
    )
}