import { ReactNode } from 'react'
import { MolHeader } from '../../molecules/header/header'
import './default.scss'
import { BreadcrumbItem, MolBreadcrumb } from '../../molecules/breadcrumb/breadcrumb'

type Props = {
    breadcrumbs?: BreadcrumbItem[]
    children: ReactNode
}

export const OrgDefault = ({ breadcrumbs, children }: Props) => {
    return (
        <div id='default-template'>
            <MolHeader/>
            { breadcrumbs && <MolBreadcrumb items={breadcrumbs} /> }
            <main>
                { children }
            </main>
        </div>
    )
}