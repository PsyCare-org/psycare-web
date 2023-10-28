import { Typography } from '@mui/material'
import { useParticipant } from '@videosdk.live/react-sdk'
import { useEffect, useMemo, useRef } from 'react'
import ReactPlayer from 'react-player'
import { Attendance } from 'src/types'
import './styles.scss'

type Props = {
    id: string
    attendance: Attendance
}

export const CallParticipant = ({ 
    id,
    attendance
}: Props) => {

    const micRef = useRef<any>(null)

    const {
        webcamStream,
        micStream,
        webcamOn,
        micOn,
        isLocal,
        displayName
    } = useParticipant(id)

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
                micRef.current.play().catch((err: any) => console.log('Mic error', err))
            } else {
                micRef.current.srcObject = null
            }
        }
    }, [micStream, micOn])

    return (
        <div id='call-participant'>
            <Typography variant='body2'>
                { displayName }
            </Typography>
            <Typography variant='body2'>
                Mic: { micOn ? ' ON' : ' OFF' } | Webcam: { webcamOn ? ' ON' : ' OFF' }
            </Typography>

            <audio 
                ref={micRef}
                autoPlay
                muted={isLocal}
            />

            <div id='webcam-wrap'>
                { webcamOn && (
                    <ReactPlayer
                        pip={false}
                        light={false}
                        controls={false}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        height={'200px'}
                        width={'300px'}
                        onError={(err: any) => console.log('Webcam error', err)}
                    />
                )}
            </div>
        </div>
    )
}