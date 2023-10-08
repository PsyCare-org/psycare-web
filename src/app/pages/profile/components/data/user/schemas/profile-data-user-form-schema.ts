import { Gender } from 'src/enums'
import * as Yup from 'yup'

export const profileDataUserFormSchema = Yup.object({
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
        .required('A Data de Nascimento é obrigatória')
})