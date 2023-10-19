import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ReactNode } from 'react'
import { CalendarHour } from 'src/types'
import { hours as hours_, days as days_ } from 'src/constants'
import './calendar.scss'

type Props = {
    className?: string
    border?: boolean
    children: (id: CalendarHour, label?: string) => ReactNode
}

export const MolCalendar = ({
    className,
    border = true,
    children,
}: Props) => {
    
    const days = Object.entries(days_)
    const hours = Object.entries(hours_).sort()
    const invalidHours = ['sab-13', 'sab-14', 'sab-15', 'sab-16']

    return (
        <TableContainer id='mol-calendar' { ...className && { className } }>
            <Table className={border ? '' : 'disabled-border'}>
                <TableHead>
                    <TableRow>
                        <TableCell className='head-cell' />
                        { days.map(([id, label]) => (
                            <TableCell className='head-cell' key={id}>
                                {label}
                            </TableCell>
                        )) }
                    </TableRow>
                </TableHead>

                <TableBody>
                    { hours.map(([hourId, hourLabel]) => (
                        <TableRow key={hourId}>
                            <TableCell className='head-cell'>
                                { hourLabel }
                            </TableCell>
                            { days.map(([dayId, dayLabel]) => {
                                const id = `${dayId}-${hourId}` as CalendarHour
                                const label = `${dayLabel} às ${hourLabel}`
                                const isValid = !invalidHours.includes(id)

                                return isValid && (
                                    <TableCell key={id} className='normal-cell'>
                                        { children(id, label) }
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}