import { Typography } from '@mui/material'
import { EventProps } from 'react-big-calendar'
import './calendar-event.scss'

export const AtomCalendarEvent = ({ ...props }: EventProps) => {
    return (
        <div id='atom-calendar-event'>
            <Typography variant='body1' color='white'>
                { props.event.title }
            </Typography>
        </div>
    )
}