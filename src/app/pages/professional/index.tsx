import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BreadcrumbItem, OrgDefault } from 'src/app/components'
import { useApi } from 'src/app/hooks'
import { Professional as ProfessionalType } from 'src/types'

export const Professional = () => {
    
    const { id } = useParams()
    const { get } = useApi()

    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | undefined>(undefined)
    const [professional, setProfessional] = useState<ProfessionalType | null>(null)

    useEffect(() => {
        get(`/professional/${id}`).then(res => {
            setProfessional(res)
            setBreadcrumbs([
                { active: true, label: 'Profissionais', url: '/professionals' },
                { active: false, label: `${res.name} ${res.surname}`, url: `/professionals/${id}` }
            ])
        })
    }, [])

    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            <h1>{ professional?.name }</h1>
        </OrgDefault>
    )
}