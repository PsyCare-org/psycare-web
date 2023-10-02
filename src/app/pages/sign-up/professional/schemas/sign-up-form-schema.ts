import { Gender } from 'src/enums/gender'
import { ProfessionalType } from 'src/enums/professional-type'
import * as Yup from 'yup'

export const signUpFormSchema = Yup.object({
    email: Yup.string()
        .typeError('O Email é obrigatório')
        .email('Deve ser um email válido')
        .required('O Email é obrigatório'),
    password: Yup.string()
        .typeError('A Senha é obrigatória')
        .required('A Senha é obrigatória')
        .min(8, 'A senha precisa ter ao mínimo 8 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/gm,
            'A senha necessita ter ao menos um caractere minúsculo, um caractere maísculo, um número e um caractere especial'
        ),
    confirmPassword: Yup.string()
        .typeError('A Confirmação é obrigatória')
        .required('A Confirmação é obrigatória')
        .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
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
    type: Yup.mixed<ProfessionalType>()
        .typeError('A Especialidade é obrigatória')
        .required('A Especialidade é obrigatória')
        .oneOf(
            Object.values(ProfessionalType),
            'Deve ser uma Especialidade válida'
        ),
    languages: Yup.array()
        .required('As Linguagens são obrigatórias')
        .min(1),
    abstract: Yup.string()
        .typeError('O Resumo é obrigatório')
        .required('O Resumo é obrigatório'),
})
