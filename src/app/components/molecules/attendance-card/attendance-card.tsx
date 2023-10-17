import { Card, CardContent, Divider, Typography } from '@mui/material'
import { Attendance } from 'src/types'
import { MolProfessionalHeader } from '../professional-header/professional-header'
import { useNavigate } from 'react-router-dom'
import { useUtils } from 'src/app/hooks'
import './attendance-card.scss'

type Props = {
    attendance: Attendance
}

export const MolAttendanceCard = ({ attendance }: Props) => {

    const navigate = useNavigate()
    const { formatCalendarHour } = useUtils()

    return (
        <Card id='mol-attendance-card' onClick={() => navigate(`/attendance/${attendance.id}`)}>
            <CardContent>
                <MolProfessionalHeader
                    professional={attendance.professional}
                    showLangAndRating={false}
                    size='small'
                />

                <Divider
                    orientation='vertical'
                    flexItem
                />

                <div id='details'>
                    <div id='calendar-hour'>
                        <Typography variant='subtitle1' color='primary'>
                            Horário dos encontros:
                        </Typography>
                        <Typography variant='body1'>
                            {formatCalendarHour(attendance.calendarHour)}
                        </Typography>
                    </div>
                    <div id='meetings-count'>
                        <Typography variant='subtitle1' color='primary'>
                            Encontros realizados:
                        </Typography>
                        <Typography variant='body1'>
                            {attendance.meetingsCount || 0}
                        </Typography>
                    </div>
                    <Typography id='created-at' variant='body2' color='text.secondary'>
                        Desde {new Date(attendance.createdAt).toLocaleDateString()}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}