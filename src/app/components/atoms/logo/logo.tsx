import logoFull from 'src/assets/images/logo-full.png'
import logoFull2 from 'src/assets/images/logo-full-2.png'
import logo from 'src/assets/images/logo-full.png'
import './logo.scss'

type Types = 'full' | 'full-2' | 'icon'

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
        'full-2': logoFull2,
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