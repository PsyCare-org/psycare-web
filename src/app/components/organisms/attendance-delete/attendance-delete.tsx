import { Attendance } from 'src/types'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Typography } from '@mui/material'
import { useApi, usePerson, useSnackbar } from 'src/app/hooks'
import { AtomButton } from '../../atoms/button/button'
import './attendance-delete.scss'
import { AttendanceStatus } from 'src/enums'
import { useNavigate } from 'react-router-dom'

type Props = {
    data: Attendance
    professionalName: string
    patientName: string
}

export const MolAttendanceDelete = ({
    data,
    professionalName,
    patientName
}: Props) => {

    const { person } = usePerson()
    const { patch } = useApi()
    const { createSnack } = useSnackbar()
    const navigate = useNavigate()

    const otherPerson = person?.type == 'user' ? professionalName : patientName

    const onSubmit = () => {
        const payload = {
            calendarHour: data.calendarHour,
            status: AttendanceStatus.closed
        }

        patch(`/attendance/${data.id}`, payload).then(() => {
            createSnack('Atendimento encerrado com sucesso!', 'success')
            navigate(`/historic/${data.id}`)
        })
    }

    return (
        <div id='attendance-delete'>
            <div id='title'>
                <ErrorOutlineIcon/>
                <Typography variant='h5'>
                    OPERAÇÃO IRREVERSÍVEL!
                </Typography>
            </div>

            <div id='content'>
                <Typography variant='body1'>
                    Você está prestes a encerrar o acompanhamento com {otherPerson}. Por favor, esteja ciente de que essa ação é irreversível e implica nas seguintes consequências:
                </Typography>

                <ul>
                    <Typography component='li' variant='body1'>
                        Não será mais possível gerênciar quaisquer dados relacionados atendimento (exceto avaliação).
                    </Typography>
                    <Typography component='li' variant='body1'>
                        Todos os encontros pendentes ou futuros relacionados a este atendimento serão cancelados.
                    </Typography>
                    <Typography component='li' variant='body1'>
                        O histórico deste atendimento será mantido para referência futura.
                    </Typography>
                </ul>

                <Typography variant='body1' fontWeight={500}>
                    Certifique-se de que está ciente desta ação. Se você tiver dúvidas ou preocupações, recomendamos que discuta com o outro envolvido antes de confirmar.
                </Typography>
            </div>

            <AtomButton
                variant='contained' 
                color='error' 
                onClick={onSubmit}
            >
                Encerrar atendimento
            </AtomButton>
        </div>
    )
}