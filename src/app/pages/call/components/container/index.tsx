import { useMeeting } from '@videosdk.live/react-sdk'
import { useEffect, useState } from 'react'
import { CallJoin } from '../join'
import { Attendance } from 'src/types'
import { CallParticipant } from '../participant'
import { CallControls } from '../controls'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
import { OrgChat } from 'src/app/components'
import { io } from 'socket.io-client'
import { env } from 'src/constants'

const chatSocket = io(env.wsUrl || '')

type Props = {
    callId: string
    attendance: Attendance
}

export const CallContainer = ({ callId, attendance }: Props) => {

    const navigate = useNavigate()

    const {
        join,
        leave,
        getMics,
        toggleMic,
        changeMic,
        getWebcams,
        toggleWebcam,
        changeWebcam,
        participants,
    } = useMeeting()

    const [joined, setJoined] = useState<boolean>(false)
    const [chatFlag, setChatFlag] = useState<boolean>(false)

    const joinCall = () => {
        join()
        setJoined(true)
    }

    const leaveCall = () => {
        leave()
        setJoined(false)
        navigate(`/attendances/${attendance.id}`)
    }

    useEffect(() => {
        chatSocket.connect()
        chatSocket.emit('joinRoom', attendance.id.toString())

        return () => {
            chatSocket.disconnect()
        }
    }, [])

    return (
        <div id='call-container'>
            {!joined && (
                <CallJoin
                    attendance={attendance}
                    callId={callId}
                    joinCall={joinCall}
                />
            )}

            {joined && (
                <div id='call'>
                    <div id='view'>
                        <div id='participants'>
                            {[...participants.keys()].map(participantId => (
                                <CallParticipant
                                    key={participantId}
                                    id={participantId}
                                    attendance={attendance}
                                />
                            ))}
                        </div>

                        { chatFlag && (
                            <OrgChat 
                                attendance={attendance}
                                socket={chatSocket}
                                showHead={false}
                            />
                        )}
                    </div>

                    <CallControls
                        callId={callId}
                        leaveCall={leaveCall}
                        getMics={getMics}
                        toggleMic={toggleMic}
                        changeMic={changeMic}
                        getWebcams={getWebcams}
                        toggleWebcam={toggleWebcam}
                        changeWebcam={changeWebcam}
                        toggleDrawer={() => setChatFlag(!chatFlag)}
                    />
                </div>
            )}
        </div>
    )
}