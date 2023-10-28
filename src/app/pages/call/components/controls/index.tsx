import { IconButton, Typography } from '@mui/material'
import MicOutlinedIcon from '@mui/icons-material/MicOutlined'
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined'
import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined'
import './styles.scss'
import { useState } from 'react'

type Props = {
    callId: string
    toggleMic: (customAudioTrack?: MediaStream | undefined) => void
    toggleWebcam: (customVideoTrack?: MediaStream | undefined) => void
    leaveCall: () => void
}

export const CallControls = ({
    callId,
    toggleMic,
    toggleWebcam,
    leaveCall
}: Props) => {

    const [micOn, setMicOn] = useState<boolean>(false)
    const [webcamOn, setWebcamOn] = useState<boolean>(false)

    const onChangeMic = () => {
        setMicOn(!micOn)
        toggleMic()
    }

    const onChangeWebcam = () => {
        setWebcamOn(!webcamOn)
        toggleWebcam()
    }

    return (
        <div id='call-controls'>
            <div id='text'>
                <Typography variant='body2' color='text.secondary'>
                    ID da chamada:
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    { callId }
                </Typography>
            </div>

            <div id='buttons'>
                <IconButton 
                    id='mic'
                    className={micOn ? 'active' : 'inactive'}
                    onClick={onChangeMic}
                >
                    { micOn ? <MicOutlinedIcon/> : <MicOffOutlinedIcon/> }
                </IconButton>

                <IconButton 
                    id='webcam'
                    className={webcamOn ? 'active' : 'inactive'}
                    onClick={onChangeWebcam}
                >
                    { webcamOn ? <VideocamOutlinedIcon/> : <VideocamOffOutlinedIcon/> }
                </IconButton>

                <IconButton 
                    id='leave'
                    onClick={leaveCall}
                >
                    <CallEndOutlinedIcon />
                </IconButton>
            </div>

            <div></div>
        </div>
    )
}