import { Button, Typography } from '@mui/material'
import mindImg from 'src/assets/images/mind.png'
import './styles.scss'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {

    const navigate = useNavigate()

    return (
        <main id='not-found'>
            <div id='text'>
                <Typography variant='h1'>
                    404
                </Typography>
                <Typography variant='h4'>
                    Desculpe, página não encontrada
                </Typography>
                <Typography variant='body1'>
                    O link que você seguiu provavelmente está quebrado ou foi removido
                </Typography>

                <Button variant='text' onClick={() => navigate('/')}>
                    Voltar a página inicial
                </Button>
            </div>
            <img src={mindImg} />
        </main>
    )
}