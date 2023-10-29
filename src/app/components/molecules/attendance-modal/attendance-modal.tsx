import { ReactNode, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePerson } from 'src/app/hooks'
import { Attendance } from 'src/types'
import { AtomModal } from '../../atoms/modal/modal'
import { MolProfessionalDisplay } from '../professional-display/professional-display'
import { MolUserDisplay } from '../user-display/user-display'
import { Divider, IconButton, Tooltip } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import VideoChatIcon from '@mui/icons-material/VideoChat'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import './attendance-modal.scss'

type Props = {
    flag: boolean
    setFlag: (value: SetStateAction<boolean>) => void
    attendance: Attendance
    children?: ReactNode
    showChatBtn?: boolean
}

export const MolAttendanceModal = ({
    flag,
    setFlag,
    attendance,
    children,
    showChatBtn = true
}: Props) => {

    const { person } = usePerson()
    const navigate = useNavigate()

    const onAttendance = () => {
        navigate(`/attendances/${attendance.id}`)
    }
    
    const onChat = () => {
        navigate(`/messages?attendanceId=${attendance.id}`)
    }

    const onCall = () => {
        navigate(`/attendances/${attendance.id}/call`)
    }

    return (
        <AtomModal
            value={flag}
            setValue={setFlag}
            showButtons={false}
            showTitle={false}
        >
            <div id='mol-attendance-modal'>
                {person?.type === 'user' && (
                    <MolProfessionalDisplay
                        professional={attendance.professional}
                        size='x-small'
                        showLangAndRating={false}
                    />
                )}

                {person?.type === 'professional' && (
                    <MolUserDisplay
                        user={attendance.user}
                        size='x-small'
                    />
                )}

                <Divider flexItem />

                <div id='actions'>
                    { children && children }

                    <div id='buttons'>
                        <Tooltip title='Entrar na chamada'>
                            <IconButton color='primary' onClick={onCall}>
                                <VideoChatIcon />
                            </IconButton>
                        </Tooltip>

                        { showChatBtn && (
                            <Tooltip title='Abrir chat' onClick={onChat}>
                                <IconButton>
                                    <ChatIcon />
                                </IconButton>
                            </Tooltip>
                        )}

                        <Tooltip title='Ver acompanhamento'>
                            <IconButton onClick={onAttendance}>
                                <NavigateNextIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </AtomModal>
    )
}