import { IconButton, Typography } from '@mui/material'
import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined'
import { Mic } from '../../types/mic'
import { Webcam } from '../../types/webcam'
import { CallControlsMic } from './mic'
import { CallControlsWebcam } from './webcam'
import ChatIcon from '@mui/icons-material/Chat'
import './styles.scss'

type Props = {
    callId: string
    getMics: () => Promise<Mic[]>
    toggleMic: (customAudioTrack?: MediaStream | undefined) => void
    changeMic: (object: string | MediaStream) => void
    getWebcams: () => Promise<Webcam[]>
    toggleWebcam: (customVideoTrack?: MediaStream | undefined) => void
    changeWebcam: (object: string | MediaStream) => void
    leaveCall: () => void
    chatFlag: boolean
    toggleChat: () => void
}

export const CallControls = ({
    callId,
    getMics,
    toggleMic,
    changeMic,
    getWebcams,
    toggleWebcam,
    changeWebcam,
    leaveCall,
    chatFlag,
    toggleChat
}: Props) => {
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
                <CallControlsMic
                    getMics={getMics}
                    changeMic={changeMic}
                    toggleMic={toggleMic}
                />

                <CallControlsWebcam
                    getWebcams={getWebcams}
                    changeWebcam={changeWebcam}
                    toggleWebcam={toggleWebcam}
                />

                <IconButton 
                    id='leave'
                    onClick={leaveCall}
                >
                    <CallEndOutlinedIcon />
                </IconButton>
            </div>

            <div id='right'>
                <IconButton
                    className={chatFlag ? 'active' : 'inactive'}
                    onClick={toggleChat}
                >
                    <ChatIcon />
                </IconButton>
            </div>
        </div>
    )
}