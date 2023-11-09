import * as Yup from 'yup'

export const filterSchema = Yup.object().shape({
    startDate: Yup.mixed(),
    endDate: Yup.mixed(),
    keyword: Yup.string()
})
