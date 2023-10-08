import { Gender } from 'src/enums/gender'

export const genderOptions = Object.values(Gender).map(el => ({
    value: el,
    label: el
}))