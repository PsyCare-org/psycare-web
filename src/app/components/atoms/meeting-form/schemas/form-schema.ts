import * as Yup from 'yup'

export const formSchema = Yup.object({
    dateTime: Yup.mixed()
        .typeError('A Data é obrigatória')
        .required('A Data é obrigatória'),
    status: Yup.string()
        .typeError('O Status é obrigatório')
        .required('O Status é obrigatório'),
    relatory: Yup.string()
        .typeError('O Relatorio é obrigatório')
        .required('O Relatorio é obrigatório'),
    analisys: Yup.string(),
    observations: Yup.string(),
})