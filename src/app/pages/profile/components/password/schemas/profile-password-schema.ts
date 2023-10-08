import * as Yup from 'yup'

export const profilePasswordFormSchema = Yup.object({
    currentPassword: Yup.string()
        .typeError('A Senha atual é obrigatória')
        .required('A Senha atual é obrigatória'),
    newPassword: Yup.string()
        .typeError('A Nova senha é obrigatória')
        .required('A Nova senha é obrigatória')
        .min(8, 'A senha precisa ter ao mínimo 8 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/gm,
            'A senha necessita ter ao menos um caractere minúsculo, um caractere maísculo, um número e um caractere especial'
        ),
    newConfirmPassword: Yup.string()
        .typeError('A Confirmação é obrigatória')
        .required('A Confirmação é obrigatória')
        .oneOf([Yup.ref('newPassword')], 'As senhas não coincidem'),
})