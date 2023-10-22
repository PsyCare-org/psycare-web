import * as Yup from 'yup'

export const formSchema = Yup.object({
    initialDemand: Yup.string()
        .typeError('A Demanda Inicial é obrigatória')
        .required('A Demanda Inicial é obrigatória'),
    pastHistory: Yup.string(),
    intervationPlan: Yup.string(),
    evolutions: Yup.string()
})