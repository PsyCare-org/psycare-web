import { days, hours } from 'src/constants'
import { CalendarHour } from 'src/types'

export const useUtils = () => {

    const formatCalendarHour = (calendarHour: CalendarHour) => {
        const [ day, hour ] = calendarHour.split('-')
        return `${days[day]} às ${hours[hour]}`
    }

    return {
        formatCalendarHour
    }
}