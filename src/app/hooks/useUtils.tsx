import dayjs from 'dayjs'
import { WeekDayMap, days, hours, weekDayMap } from 'src/constants'
import { CalendarHour } from 'src/types'

export const useUtils = () => {

    const formatDate = (origin: string) => {
        return new Date(origin).toLocaleDateString('pt-BR')
    }

    const formatCalendarHour = (calendarHour: CalendarHour, upperCase = true) => {
        const [ day, hour ] = calendarHour.split('-')
        return `${upperCase ? days[day] : days[day].toLowerCase()} às ${hours[hour]}`
    }

    const calcAge = (birthDate: string) => {
        return `${dayjs(new Date()).diff(birthDate, 'years')} anos`
    }

    const getCalendarHourDates = (calendarHour: CalendarHour) => {
        const [weekDay, hour] = calendarHour.split('-')
        const weekDayNumber = weekDayMap[weekDay as keyof WeekDayMap]
        
        const day = dayjs().day(weekDayNumber).hour(parseInt(hour))

        return {
            start: day.startOf('hour').toDate(),
            end: day.endOf('hour').toDate()
        }
    }

    return {
        formatDate,
        formatCalendarHour,
        calcAge,
        getCalendarHourDates
    }
}