import dayjs from 'dayjs'
import { days, hours } from 'src/constants'
import { CalendarHour } from 'src/types'

export const useUtils = () => {

    const formatCalendarHour = (calendarHour: CalendarHour) => {
        const [ day, hour ] = calendarHour.split('-')
        return `${days[day]} às ${hours[hour]}`
    }

    const calcAge = (birthDate: string) => {
        return `${dayjs(new Date()).diff(birthDate, 'years')} anos`
    }

    return {
        formatCalendarHour,
        calcAge
    }
}