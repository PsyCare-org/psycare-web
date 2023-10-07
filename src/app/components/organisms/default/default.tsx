import { ReactNode } from 'react'
import { MolHeader } from '../../molecules/header/header'
import './default.scss'

type Props = {
    children: ReactNode
}

export const OrgDefault = ({ children }: Props) => {
    return (
        <div id='default-template'>
            <MolHeader/>
            <main>
                { children }
            </main>
        </div>
    )
}