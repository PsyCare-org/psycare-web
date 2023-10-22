import { useNavigate } from 'react-router-dom'
import { ChildProps } from '../types/child-props'
import { Link } from '@mui/material'



export const useChildProps = (): ChildProps => {
    const navigate = useNavigate()

    return {
        user: {
            breadcrumbs: [{
                active: false,
                label: 'Acompanhamentos',
                url: '/attendances'
            }],
            title: 'Acompanhamentos',
            subTitle: 'Aqui você encontra informações sobre os seus acompanhamentos em andamento e as solicitações pendentes.',
            emptyTitle: 'Nenhum Acompanhamento Ativo!',
            emptyDescription: <>
                Você não possui nenhum acompanhamento ativo no momento. Considere explorar a <Link onClick={() => navigate('/professionals')}>lista de profissionais</Link> disponíveis ou verificar o <Link onClick={() => navigate('/historics')}>histórico de acompanhamentos</Link> anteriores.
            </>
        },
        professional: {
            breadcrumbs: [{
                active: false,
                label: 'Pacientes',
                url: '/attendances'
            }],
            title: 'Pacientes',
            subTitle: 'Aqui estão todos os atendimentos ativos que você, como profissional, está atualmente cuidando. Este é o seu espaço para acompanhar o progresso e fornecer o melhor suporte aos seus pacientes.',
            emptyTitle: 'Nenhum Paciente ativo!',
            emptyDescription: <>
                Atualmente, não há pacientes com acompanhamentos ativos em sua lista. Para iniciar um acompanhamento com um novo paciente, confira a lista de solicitações de acompanhamento pendentes. Certifique-se de manter o <Link onClick={() => navigate('/profile')}>seu perfil</Link> na plataforma atualizado.
            </>
        }
    }
}