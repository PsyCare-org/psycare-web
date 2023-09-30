import { ReactNode } from 'react'
import mindImg from 'src/assets/images/mind.png'
import { Typography } from '@mui/material'
import { LogoAtom } from '../../atoms/logo/logo'
import './auth.scss'

type Props = {
    children: ReactNode
}

export const AuthTemplate = ({ children }: Props) => {
    return (
        <div className='auth-template'>
            <main>
                <LogoAtom />
                <div className='content'>
                    { children }
                </div>
            </main>
            <aside>
                <img src={mindImg} />
                <Typography className='text' variant='caption' color='white'>
                    Acompanhamento acessível, online, em qualquer momento e lugar
                </Typography>
            </aside>
        </div>
    )
}
