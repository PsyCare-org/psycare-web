type WeekDayKeys = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab'

export type WeekDayMap = {
    [key in WeekDayKeys]: number
}

export const weekDayMap: WeekDayMap = {
    'dom': 0,
    'seg': 1,
    'ter': 2,
    'qua': 3,
    'qui': 4,
    'sex': 5,
    'sab': 6
}