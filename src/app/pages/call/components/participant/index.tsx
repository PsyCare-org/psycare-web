import { Avatar, Typography } from '@mui/material'
import { useParticipant } from '@videosdk.live/react-sdk'
import { useEffect, useMemo, useRef } from 'react'
import ReactPlayer from 'react-player'
import { Attendance } from 'src/types'
import MicOutlinedIcon from '@mui/icons-material/MicOutlined'
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined'
import './styles.scss'

type Props = {
    id: string
    attendance: Attendance
}

export const CallParticipant = ({ 
    id,
    attendance
}: Props) => {

    const {
        webcamStream,
        micStream,
        webcamOn,
        micOn,
        isLocal,
        displayName
    } = useParticipant(id)

    const micRef = useRef<any>(null)

    const [name, type] = displayName.split('@')

    const videoStream = useMemo(() => {
        if(webcamOn && webcamStream) {
            const mediaStream = new MediaStream()
            mediaStream.addTrack(webcamStream.track)
            return mediaStream
        }
    }, [webcamStream, webcamOn])

    useEffect(() => {
        if(micRef.current) {
            if(micOn && micStream) {
                const mediaStream = new MediaStream()
                mediaStream.addTrack(micStream.track)

                micRef.current.srcObject = mediaStream
                micRef.current.play().catch((err: any) => console.error('Mic error', err))
            } else {
                micRef.current.srcObject = null
            }
        }
    }, [micStream, micOn])

    return (
        <div id='call-participant'>
            <div id='mic'>
                { micOn ? <MicOutlinedIcon/> : <MicOffOutlinedIcon/> }
                <audio 
                    ref={micRef}
                    autoPlay
                    muted={isLocal}
                />
            </div>

            <Typography id='display-name' variant='body1'>
                { name }
            </Typography>

            <div id='webcam'>
                { webcamOn 
                    ? (
                        <ReactPlayer
                            id='active'
                            pip={false}
                            light={false}
                            controls={false}
                            muted={true}
                            playing={true}
                            url={videoStream}
                            width='70%'
                            height='100%'
                            onError={(err: any) => console.error('Webcam error', err)}
                        />
                    )
                    : (
                        <Avatar 
                            id='inactive'
                            src={attendance[type as 'user' | 'professional']?.avatar}
                        />
                    )
                }
            </div>
        </div>
    )
}