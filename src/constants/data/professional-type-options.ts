import { ProfessionalType } from 'src/enums/professional-type'

export const typeOptions = Object.values(ProfessionalType).map(el => ({
    value: el,
    label: el
}))