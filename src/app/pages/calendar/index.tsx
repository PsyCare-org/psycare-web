import { BreadcrumbItem, OrgDefault } from 'src/app/components'
import { Calendar as BigCalendar, Event, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useApi, usePerson, useUtils } from 'src/app/hooks'
import { Attendance } from 'src/types'
import { CalendarEvent } from './event'
import { CalendarHeader } from './header'
import './styles.scss'
import { MolAttendanceModal } from 'src/app/components/molecules/attendance-modal/attendance-modal'

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

    const weekDay: string = event?.start?.toLocaleDateString('pt-BR', { weekday: 'long' }) as string
    const formatedWeekDay = weekDay && weekDay[0].toUpperCase() + weekDay.slice(1)
    const start = dayjs(event?.start)
    const end = dayjs(event?.end)

    const label = `${formatedWeekDay}, ${start?.get('hours')}:${start?.get('minutes')}0 - ${end?.get('hours')}:${end?.get('minutes')}`

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
                        <MolAttendanceModal
                            attendance={event.resource as Attendance}
                            flag={modal}
                            setFlag={setModal}
                        >
                            <Typography id='calendar-label' variant='h6'>
                                { label }
                            </Typography>
                        </MolAttendanceModal>
                    )}
                </div>
            </div>
        </OrgDefault>
    )
}