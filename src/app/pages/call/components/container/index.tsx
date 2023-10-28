import { useMeeting } from '@videosdk.live/react-sdk'
import { useState } from 'react'
import { CallJoin } from '../join'
import { Attendance } from 'src/types'
import { CallParticipant } from '../participant'
import { CallControls } from '../controls'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

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

    const joinCall = () => {
        join()
        setJoined(true)
    }

    const leaveCall = () => {
        leave()
        setJoined(false)
        navigate(`/attendances/${attendance.id}`)
    }

    return (
        <div id='call-container'>     
            { !joined && (
                <CallJoin
                    attendance={attendance}
                    callId={callId}
                    joinCall={joinCall}
                />
            )}

            { joined && (
                <>
                    <div id='participants'>
                        {[...participants.keys()].map(participantId => (
                            <CallParticipant
                                key={participantId}
                                id={participantId}
                                attendance={attendance}
                            />
                        ))}
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
                    />
                </>
            )}
        </div>
    )
}