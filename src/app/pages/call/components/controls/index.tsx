import { IconButton } from '@mui/material'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined'
import './styles.scss'

type Props = {
    toggleMic: (customAudioTrack?: MediaStream | undefined) => void
    toggleWebcam: (customVideoTrack?: MediaStream | undefined) => void
    leaveCall: () => void
}

export const CallControls = ({
    toggleMic,
    toggleWebcam,
    leaveCall
}: Props) => {
    return (
        <div id='call-controls'>
            <IconButton id='mic' onClick={() => toggleMic()}>
                <MicNoneOutlinedIcon/>
            </IconButton>

            <IconButton id='cam' onClick={() => toggleWebcam()}>
                <VideocamOutlinedIcon/>
            </IconButton>

            <IconButton id='leave' onClick={leaveCall}>
                <CallEndOutlinedIcon/>
            </IconButton>
        </div>
    )
}