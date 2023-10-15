import { Tooltip, Typography } from '@mui/material'
import { MolCalendar } from 'src/app/components/molecules/calendar/calendar'
import { CalendarHour } from 'src/types'
import CheckIcon from '@mui/icons-material/Check'
import RemoveIcon from '@mui/icons-material/Remove'
import './styles.scss'

type Props = {
    occupiedHours: CalendarHour[]
}

export const ProfessionalCalendar = ({ occupiedHours }: Props) => {
    return (
        <div id='professional-calendar'>
            <Typography variant='h5'>
                Horários
            </Typography>

            <MolCalendar border={false}>
                {(id, label) => {
                    const isOccupied = occupiedHours.includes(id)

                    return (
                        <Tooltip title={isOccupied ? 'Horário ocupado' : label}>
                            {isOccupied
                                ? (
                                    <div className='occupied-hour'>
                                        <RemoveIcon />
                                    </div>
                                )
                                : (
                                    <div className='free-hour'>
                                        <CheckIcon />
                                    </div>
                                )
                            }
                        </Tooltip>
                    )
                }}
            </MolCalendar>
        </div>
    )
}