import logoFull from 'src/assets/images/logo-full.png'
import logoFullInverted from 'src/assets/images/logo-full-inverted.png'
import logo from 'src/assets/images/logo-full.png'
import './logo.scss'

type Types = 'full' | 'full-inverted' | 'icon'

type TypesMap = {
    [key in Types]: string
}

type Props = {
    type?: Types
}

export const AtomLogo = ({ 
    type = 'full' 
}: Props) => {

    const source: TypesMap = {
        full: logoFull,
        'full-inverted': logoFullInverted,
        icon: logo
    }

    return (
        <img 
            className={'logo-atom ' + type}
            src={source[type]}
            alt="Logotipo da PsyCare"
        />
    )
}