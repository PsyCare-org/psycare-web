import * as Yup from 'yup'

export const formSchema = Yup.object().shape({
    email: Yup.string()
        .typeError('O Email é obrigatório')
        .email('Deve ser um email válido')
        .required('O Email é obrigatório'),
    password: Yup.string()
        .typeError('A senha é obrigatória')
        .required('A senha é obrigatória')
})