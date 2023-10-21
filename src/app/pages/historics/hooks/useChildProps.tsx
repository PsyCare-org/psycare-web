import { useNavigate } from 'react-router-dom'
import { ChildProps } from '../types/child-props'
import { Link } from '@mui/material'

export const useChildProps = (): ChildProps => {
    const navigate = useNavigate()

    return {
        user: {
            title: 'Histórico de Acompanhamentos',
            subTitle: 'Aqui estão registrados todos os seus acompanhamentos inativos ou encerrados.',
            emptyTitle: 'Nenhum histórico de acompanhamento!',
            emptyDescription: <>
                Você não possui nenhum histórico de acompanhamento. Considere explorar a <Link onClick={() => navigate('/professionals')}>lista de profissionais</Link> disponíveis.
            </>
        },
        professional: {
            title: 'Histórico de Atendimento',
            subTitle: 'Aqui estão registrados todos os seus atendimentos inativos ou encerrados.',
            emptyTitle: 'Nenhum histórico de atendimento!',
            emptyDescription: <>
                Você não possui nenhum histórico de atendimento.
            </>
        }
    }
}