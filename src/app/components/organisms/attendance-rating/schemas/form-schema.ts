import * as Yup from 'yup'

export const formSchema = Yup.object({
    value: Yup.number().required(),
    description: Yup.string(),
})