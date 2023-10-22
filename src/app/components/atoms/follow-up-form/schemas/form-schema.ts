import { FollowUpType } from 'src/enums'
import * as Yup from 'yup'

export const formSchema = Yup.object({
    title: Yup.string()
        .typeError('O Título é obrigatório')
        .required('O Título é obrigatório'),
    description: Yup.string(),
    type: Yup.mixed<FollowUpType>()
        .typeError('O Tipo é obrigatório')
        .required('O Tipo é obrigatório')
        .oneOf(
            Object.values(FollowUpType), 
            'Deve ser um Tipo válido'
        )
})