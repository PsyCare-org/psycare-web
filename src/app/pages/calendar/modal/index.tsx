import { Divider, IconButton, Tooltip, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { SetStateAction } from 'react'
import { Event } from 'react-big-calendar'
import { AtomModal, MolProfessionalDisplay } from 'src/app/components'
import { MolUserDisplay } from 'src/app/components/molecules/user-display/user-display'
import { usePerson } from 'src/app/hooks'
import { Attendance } from 'src/types'
import ChatIcon from '@mui/icons-material/Chat'
import VideoChatIcon from '@mui/icons-material/VideoChat'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import './styles.scss'
import { useNavigate } from 'react-router-dom'

type Props = {
    flag: boolean
    setFlag: (value: SetStateAction<boolean>) => void
    event: Event
}

export const CalendarModal = ({
    flag,
    setFlag,
    event
}: Props) => {

    const { person } = usePerson()
    const navigate = useNavigate()

    const weekDay: string = event?.start?.toLocaleDateString('pt-BR', { weekday: 'long' }) as string
    const formatedWeekDay = weekDay[0].toUpperCase() + weekDay.slice(1)
    const start = dayjs(event?.start)
    const end = dayjs(event?.end)

    const label = `${formatedWeekDay}, ${start.get('hours')}:${start.get('minutes')}0 - ${end.get('hours')}:${end.get('minutes')}`

    const onAttendance = () => {
        navigate(`/attendances/${event.resource.id}`)
    }
    
    const onChat = () => {
        navigate(`/messages?attendanceId=${event.resource.id}`)
    }

    const onCall = () => {
        navigate(`/attendances/${event.resource.id}/call`)
    }

    return (
        <AtomModal
            value={flag}
            setValue={setFlag}
            showButtons={false}
            showTitle={false}
        >
            <div id='calendar-modal'>
                {person?.type === 'user' && (
                    <MolProfessionalDisplay
                        professional={(event?.resource as Attendance).professional}
                        size='x-small'
                        showLangAndRating={false}
                    />
                )}

                {person?.type === 'professional' && (
                    <MolUserDisplay
                        user={(event?.resource as Attendance).user}
                        size='x-small'
                    />
                )}

                <Divider flexItem />

                <div id='actions'>
                    <Typography variant='h6'>
                        {label}
                    </Typography>

                    <div id='buttons'>
                        <Tooltip title='Entrar na chamada'>
                            <IconButton color='primary' onClick={onCall}>
                                <VideoChatIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title='Abrir chat' onClick={onChat}>
                            <IconButton>
                                <ChatIcon />
                            </IconButton>
                        </Tooltip>

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