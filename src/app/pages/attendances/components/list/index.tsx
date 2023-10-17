import { Attendance } from 'src/types'
import { Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MolAttendanceCard } from 'src/app/components'
import './styles.scss'

type Props = {
    data: Attendance[]
}

export const AttendancesList = ({ data }: Props) => {

    const navigate = useNavigate()

    return (
        <div id='attendances-list'>
            {data.length > 0 && (
                <div id='list'>
                    { data.map(attendance => (
                        <MolAttendanceCard key={attendance.id} attendance={attendance} />
                    ))}
                </div>
            )}

            {data.length == 0 && (
                <div id='empty'>
                    <Typography variant='h6'>
                        Nenhum Acompanhamento Ativo!
                    </Typography>
                    <Typography variant='body1'>
                        Você não possui nenhum acompanhamento ativo no momento. Considere explorar a <Link onClick={() => navigate('/professionals')}>lista de profissionais</Link> disponíveis ou verificar o <Link onClick={() => navigate('/historic')}>histórico de acompanhamentos</Link> anteriores.
                    </Typography>
                </div>
            )}
        </div>
    )
}