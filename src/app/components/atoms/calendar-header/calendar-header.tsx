import { Typography } from '@mui/material'
import { HeaderProps } from 'react-big-calendar'
import './calendar-header.scss'

export const AtomCalendarHeader = ({ label }: HeaderProps) => {
    const [day, weekDay] = label.split(' ')

    return (
        <div id='atom-calendar-header'>
            <Typography variant='caption'>
                { weekDay.toUpperCase() }.
            </Typography>
            <Typography variant='body1' className='day'>
                { day }
            </Typography>
        </div>
    )
}