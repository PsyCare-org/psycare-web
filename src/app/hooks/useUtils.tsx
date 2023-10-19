import dayjs from 'dayjs'
import { days, hours } from 'src/constants'
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

    return {
        formatDate,
        formatCalendarHour,
        calcAge
    }
}