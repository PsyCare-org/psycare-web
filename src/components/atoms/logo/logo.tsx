import logoFull from 'src/assets/images/logo-full.png'
import logo from 'src/assets/images/logo-full.png'
import './logo.scss'

type Props = {
    type?: 'full' | 'icon'
}

export const LogoAtom = ({ 
    type = 'full' 
}: Props) => {
    console.log(logo)
    return (
        <img 
            className='logo-atom'
            src={type === 'full' ? logoFull : logo}
            alt="Logotipo da PsyCare"
        />
    )
}