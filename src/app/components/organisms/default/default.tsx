import { ReactNode } from 'react'
import { MolHeader } from '../../molecules/header/header'
import './default.scss'
import { BreadcrumbItem, MolBreadcrumb } from '../../molecules/breadcrumb/breadcrumb'

type Props = {
    breadcrumbs?: BreadcrumbItem[]
    children: ReactNode
}

export const OrgDefault = ({ breadcrumbs, children }: Props) => {
    const emptyBreacrumbs: BreadcrumbItem[] = [{
        active: false,
        label: '...',
        url: ''
    }]

    return (
        <div id='default-template'>
            <MolHeader/>
            <MolBreadcrumb items={breadcrumbs || emptyBreacrumbs}/>
            <main>
                { children }
            </main>
        </div>
    )
}