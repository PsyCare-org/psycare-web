import { ReactNode } from 'react'
import { LogoAtom } from 'src/components/atoms/logo/logo'
import mindImg from 'src/assets/images/mind.png'
import './auth.scss'
import { Typography, useTheme } from '@mui/material'

type Props = {
    children: ReactNode
}

export const AuthTemplate = ({ children }: Props) => {
    const theme = useTheme()

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
