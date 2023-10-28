import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { Mic } from '../../../types/mic'
import MicOutlinedIcon from '@mui/icons-material/MicOutlined'
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import CheckIcon from '@mui/icons-material/Check'
import { useEffect, useState } from 'react'
import './styles.scss'

type Props = {
    getMics: () => Promise<Mic[]>
    toggleMic: (customAudioTrack?: MediaStream | undefined) => void
    changeMic: (object: string | MediaStream) => void
}

export const CallControlsMic = ({
    getMics,
    toggleMic,
    changeMic
}: Props) => {

    const [list, setList] = useState<Mic[] | null>(null)
    const [activeId, setActiveId] = useState<string | null>()
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [micOn, setMicOn] = useState<boolean>(false)

    const handleList = async () => {
        const newList = await getMics()
        setActiveId(newList[0].deviceId)
        setList(newList)
    }

    const toggleHandler = () => {
        setMicOn(!micOn)
        toggleMic()
    }

    const changeHandler = (mic: Mic) => {
        changeMic(mic.deviceId)
        setActiveId(mic.deviceId)
        setMicOn(true)
        setAnchorEl(null)
    }

    useEffect(() => {
        setTimeout(() => handleList(), 500)
    }, [])

    return (
        <div id='call-controls-mic'>
            <IconButton
                id='mic'
                className={micOn ? 'active' : 'inactive'}
                onClick={toggleHandler}
            >
                {micOn ? <MicOutlinedIcon /> : <MicOffOutlinedIcon />}
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