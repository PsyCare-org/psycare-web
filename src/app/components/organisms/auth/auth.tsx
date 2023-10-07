import { ReactNode } from 'react'
import mindImg from 'src/assets/images/mind.png'
import { Typography } from '@mui/material'
import './auth.scss'
import { AtomLogo } from '../../atoms/logo/logo'

type Props = {
    children: ReactNode
}

export const OrgAuth = ({ children }: Props) => {
    return (
        <div className='auth-organism'>
            <main>
                <AtomLogo />
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
