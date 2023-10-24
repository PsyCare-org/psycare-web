import { Typography } from '@mui/material'
import { HeaderProps } from 'react-big-calendar'
import './styles.scss'

export const CalendarHeader = ({ label }: HeaderProps) => {
    const [day, weekDay] = label.split(' ')

    return (
        <div id='calendar-header'>
            <Typography variant='caption'>
                { weekDay.toUpperCase() }.
            </Typography>
            <Typography variant='body1' className='day'>
                { day }
            </Typography>
        </div>
    )
}