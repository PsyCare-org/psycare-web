import { AtomModal, BreadcrumbItem, MolProfessionalDisplay, OrgDefault } from 'src/app/components'
import { Calendar as BigCalendar, Event, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useApi, usePerson, useUtils } from 'src/app/hooks'
import { Attendance } from 'src/types'
import { CalendarEvent } from './event'
import { CalendarHeader } from './header'
import './styles.scss'
import { MolUserDisplay } from 'src/app/components/molecules/user-display/user-display'
import { CalendarModal } from './modal'

const breadcrumbs: BreadcrumbItem[] = [{
    active: false,
    label: 'Calendário',
    url: '/calendar'
}]

export const Calendar = () => {

    const { get } = useApi()
    const { person } = usePerson()
    const { getCalendarHourDates } = useUtils()

    const [data, setData] = useState<Event[]>([])

    const [event, setEvent] = useState<Event | null>(null)
    const [modal, setModal] = useState<boolean>(false)

    useEffect(() => {
        get(`/attendance/${person?.type}/${person?.id}/list`).then(({ data: { active } }) => {
            const otherPerson = person?.type === 'user' ? 'professional' : 'user'

            const newData: Event[] = active.map((attendance: Attendance) => ({
                title: `${attendance[otherPerson].name} ${attendance[otherPerson].surname || ''}`,
                ...getCalendarHourDates(attendance.calendarHour),
                resource: attendance
            } as Event))

            setData(newData)
        })
    }, [])

    const openEventModal = (event: Event) => {
        setEvent(event)
        setModal(true)
    }

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

                <div id='content'>
                    <BigCalendar
                        localizer={dayjsLocalizer(dayjs)}
                        defaultView='week'
                        toolbar={false}
                        events={data}
                        culture='pt-BR'
                        components={{
                            event: CalendarEvent,
                            header: CalendarHeader,
                            timeGutterHeader: () => <div className='custom-gutter'>00:00</div>
                        }}
                        onSelectEvent={openEventModal}
                    />

                    { event && (
                        <CalendarModal
                            event={event}
                            flag={modal}
                            setFlag={setModal}
                        />
                    )}
                </div>
            </div>
        </OrgDefault>
    )
}