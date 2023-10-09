import * as Yup from 'yup'

export const FilterSchema = Yup.object().shape({
    name: Yup.string(),
    types: Yup.array(),
    languages: Yup.array(),
    reason: Yup.string()
})
