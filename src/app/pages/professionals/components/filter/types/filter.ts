import { ProfessionalType } from 'src/enums'

export type Filter = {
    name?: string
    types?: ProfessionalType[]
    languages?: string[]
    reason?: string
}