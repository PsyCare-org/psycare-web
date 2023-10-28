import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { Webcam } from '../../../types/webcam'
import { useEffect, useState } from 'react'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import CheckIcon from '@mui/icons-material/Check'
import './styles.scss'

type Props = {
    getWebcams: () => Promise<Webcam[]>
    toggleWebcam: (customAudioTrack?: MediaStream | undefined) => void
    changeWebcam: (object: string | MediaStream) => void
}

export const CallControlsWebcam = ({
    getWebcams,
    toggleWebcam,
    changeWebcam
}: Props) => {

    const [list, setList] = useState<Webcam[] | null>(null)
    const [activeId, setActiveId] = useState<string | null>()
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [webcamOn, setWebcamOn] = useState<boolean>(false)

    const handleList = async () => {
        const newList = await getWebcams()
        setActiveId(newList[0].deviceId)
        setList(newList)
    }

    const toggleHandler = () => {
        setWebcamOn(!webcamOn)
        toggleWebcam()
    }

    const changeHandler = (webcam: Webcam) => {
        changeWebcam(webcam.deviceId)
        setActiveId(webcam.deviceId)
        setWebcamOn(true)
        setAnchorEl(null)
    }

    useEffect(() => {
        setTimeout(() => handleList(), 500)
    }, [])

    return (
        <div id='call-controls-webcam'>
            <IconButton
                id='webcam'
                className={webcamOn ? 'active' : 'inactive'}
                onClick={toggleHandler}
            >
                {webcamOn ? <VideocamOutlinedIcon /> : <VideocamOffOutlinedIcon />}
            </IconButton>

            {list && (
                <div id='change' onClick={evt =>  setAnchorEl(evt.currentTarget)}>
                    <KeyboardArrowUpOutlinedIcon id='change' />
                </div>
            )}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                { list && list.map(item => (
                    <MenuItem 
                        key={item.deviceId} 
                        onClick={() => changeHandler(item)}
                        className={item.deviceId === activeId ? 'active' : ''}
                    >
                        <ListItemIcon>
                            <CheckIcon { ...item.deviceId !== activeId && { opacity: 0 } } />   
                        </ListItemIcon>
                        <ListItemText>
                            { item.label }
                        </ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}