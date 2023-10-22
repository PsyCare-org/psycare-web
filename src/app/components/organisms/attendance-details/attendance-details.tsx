import { Attendance } from 'src/types'
import { Field } from './types/field'
import { usePerson, useUtils } from 'src/app/hooks'
import { Fragment } from 'react'
import { Typography } from '@mui/material'
import './attendance-details.scss'

type Props = {
    data: Attendance
}

export const MolAttendanceDetails = ({ data }: Props) => {

    const { formatCalendarHour, formatDate } = useUtils()
    const { person } = usePerson()

    const fields: Field[] = [
        {
            id: 'calendarHour',
            label: 'Horário dos encontros',
            value: formatCalendarHour(data.calendarHour)
        },
        {
            id: 'meetingsCount',
            label: 'Encontros realizados',
            value: data.meetings?.length || 0
        },
        {
            id: 'status',
            label: 'Status do atendimento',
            value: data.status
        },
        {
            id: 'followUpCounter',
            label: 'Afazeres cadastrados',
            value: data.followUps?.length || 0
        },
        ...person?.type === 'user'
            ? [{
                id: 'rating',
                label: 'Atendimento avaliado',
                value: data.rating ? 'Sim' : 'Não'
            } as Field]
            : [],
        {
            id: 'createdAt',
            label: 'Início do atendimento',
            value: formatDate(data.createdAt)
        },
    ]

    return (
        <div id='mol-attendance-details'>
            <div id='title'>
                <Typography variant='h5'>
                    Detalhes do Atendimento
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Aqui estão os detalhes superficiais do atendimento em questão. Para detalhes mais específicos, por favor acesse as seções correspondentes. 
                </Typography>
            </div>

            <div id='content'>
                {fields.map(({ id, label, value }) => (
                    <Fragment key={id}>
                        <div key={id} className='field'>
                            <Typography variant='subtitle1'>
                                { label }
                            </Typography>
                            <Typography variant='body1' color='text.secondary'>
                                { value }
                            </Typography>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}