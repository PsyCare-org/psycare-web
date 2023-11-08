import { BreadcrumbItem, OrgCalendar, OrgDefault } from 'src/app/components'
import { Typography } from '@mui/material'
import './styles.scss'

const breadcrumbs: BreadcrumbItem[] = [{
    active: false,
    label: 'Calendário',
    url: '/calendar'
}]

export const Calendar = () => {
    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            <div id='calendar'>
                <div id='title'>
                    <Typography variant='h4'>
                        Calendário
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Aqui está o seu calendário semanal de encontros. Este recurso oferece uma visão geral dos encontros agendados para a semana, permitindo que você acompanhe e se prepare para suas reuniões e consultas.
                    </Typography>
                </div>

                <OrgCalendar view='week'/>
            </div>
        </OrgDefault>
    )
}