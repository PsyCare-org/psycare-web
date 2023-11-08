import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Calendar, Event, View, dayjsLocalizer } from 'react-big-calendar'
import { useApi, usePerson, useUtils } from 'src/app/hooks'
import { Attendance } from 'src/types'
import { AtomCalendarEvent, AtomCalendarHeader, MolAttendanceModal } from 'src/app/components'
import { Typography } from '@mui/material'
import './calendar.scss'

type Props = {
    view: View
}

export const OrgCalendar = ({ view }: Props) => {
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

            document.querySelector('.rbc-current-time-indicator')?.scrollIntoView()
        })
    }, [])

    const openEventModal = (event: Event) => {
        setEvent(event)
        setModal(true)
    }

    return (
        <div id='mol-calendar'>
            <Calendar
                localizer={dayjsLocalizer(dayjs)}
                defaultView={view}
                toolbar={false}
                events={data}
                culture='pt-BR'
                components={{
                    event: AtomCalendarEvent,
                    header: AtomCalendarHeader,
                    timeGutterHeader: () => <div className='custom-gutter'>00:00</div>,
                    day: {
                        header: AtomCalendarHeader,
                        event: AtomCalendarEvent
                    }
                }}
                onSelectEvent={openEventModal}
            />

            {event && (
                <MolAttendanceModal
                    attendance={event.resource as Attendance}
                    flag={modal}
                    setFlag={setModal}
                >
                    <Typography id='calendar-label' variant='h6'>
                        {label}
                    </Typography>
                </MolAttendanceModal>
            )}
        </div>
    )
}