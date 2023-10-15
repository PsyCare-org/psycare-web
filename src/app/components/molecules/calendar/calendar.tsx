import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ReactNode } from 'react'
import { CalendarHour } from 'src/types'
import './calendar.scss'

type Props = {
    border?: boolean
    children: (id: CalendarHour, label?: string) => ReactNode
}

export const MolCalendar = ({
    border = true,
    children,
}: Props) => {

    const days = Object.entries({
        seg: 'Segunda-feira',
        ter: 'Terça-feira',
        qua: 'Quarta-feira',
        qui: 'Quinta-feira',
        sex: 'Sexta-feira',
        sab: 'Sábado',
    })

    const hours = Object.entries({
        '08': '08:00',
        '09': '09:00',
        '10': '10:00',
        '11': '11:00',
        '13': '13:00',
        '14': '14:00',
        '15': '15:00',
        '16': '16:00'
    }).sort()

    const invalidHours = ['sab-13', 'sab-14', 'sab-15', 'sab-16']

    return (
        <TableContainer id='mol-calendar'>
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