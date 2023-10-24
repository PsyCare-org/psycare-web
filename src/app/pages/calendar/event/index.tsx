import { Typography } from '@mui/material'
import { EventProps } from 'react-big-calendar'
import './styles.scss'

export const CalendarEvent = ({ ...props }: EventProps) => {
    return (
        <div id='calendar-event'>
            <Typography variant='body1' color='white'>
                { props.event.title }
            </Typography>
        </div>
    )
}