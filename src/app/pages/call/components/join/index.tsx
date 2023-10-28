import { IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import { Participant } from '@videosdk.live/react-sdk/dist/types/participant'
import './styles.scss'
import { AtomButton } from 'src/app/components'
import { useRef } from 'react'
import { Attendance, Professional, User } from 'src/types'
import { usePerson } from 'src/app/hooks'

type Props = {
    attendance: Attendance
    callId: string
    joinCall: () => void
}

export const CallJoin = ({
    attendance,
    callId,
    joinCall,
}: Props) => {

    const { person } = usePerson()

    const otherPerson: Professional | User = person?.type === 'user' ? attendance.professional : attendance.user
    const otherPersonName = `${otherPerson.name} ${otherPerson.surname || ''}`

    const navigate = useNavigate()

    return (
        <div id='call-join'>
            <div id='title'>
                <Typography variant='h5'>
                    Pronto(a) para participar?
                </Typography>
                <Typography variant='body1'>
                    Você está prestes a entrar no encontro com {otherPersonName}, recomendamos que você esteja em um ambiente tranquilo e com privacidade mínima. Isso ajudará a garantir que sua conversa seja confidencial e que você possa se concentrar totalmente no encontro. Sua privacidade e conforto são essenciais para uma interação eficaz e confiável.
                </Typography>
                <Typography variant='body2'>
                    ID da sala: {callId}
                </Typography>
            </div>

            <div id='buttons'>
                <AtomButton 
                    endIcon={<LoginIcon/>} 
                    onClick={joinCall}
                    variant='contained'
                >
                    Entrar
                </AtomButton>

                <AtomButton 
                    variant='text'
                    onClick={() => navigate('/home')}
                >
                    Sair
                </AtomButton>
            </div>
        </div>
    )
}