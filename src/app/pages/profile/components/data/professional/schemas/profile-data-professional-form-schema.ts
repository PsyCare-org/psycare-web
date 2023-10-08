import { Gender } from 'src/enums'
import * as Yup from 'yup'

export const profileDataProfessionalFormSchema = Yup.object({
    phoneNumber: Yup.string(),
    name: Yup.string()
        .typeError('O Nome é obrigatório')
        .required('O Nome é obrigatório'),
    surname: Yup.string(),
    gender: Yup.mixed<Gender>()
        .typeError('O Gênero é obrigatório')
        .required('O Gênero é obrigatório')
        .oneOf(
            Object.values(Gender), 
            'Deve ser um Gênero válido'
        ),
    birthDate: Yup.mixed()
        .typeError('A Data de Nascimento é obrigatória')
        .required('A Data de Nascimento é obrigatória'),
    languages: Yup.array()
        .required('As Linguagens são obrigatórias')
        .min(1),
    abstract: Yup.string()
        .typeError('O Resumo é obrigatório')
        .required('O Resumo é obrigatório'),
    expericences: Yup.string(),
    specializations: Yup.string(),
    description: Yup.string(),
    historic: Yup.string(),
})