import { Avatar, Rating, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AtomLoader, BreadcrumbItem, MolProfessionalHeader, OrgDefault } from 'src/app/components'
import { useApi, useAvatar } from 'src/app/hooks'
import { Professional as Professional_ } from 'src/types'

export const Professional = () => {

    const { id } = useParams()
    const { get } = useApi()

    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | undefined>(undefined)
    const [professional, setProfessional] = useState<Professional_ | null>(null)

    useEffect(() => {
        get(`/professional/${id}`).then(res => {
            if (res.avatar) res.avatar = useAvatar(res.avatar.avatar)
            setProfessional(res)
            setBreadcrumbs([
                { active: true, label: 'Profissionais', url: '/professionals' },
                { active: false, label: `${res.name} ${res.surname}`, url: `/professionals/${id}` }
            ])
        })
    }, [])

    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            {!professional && <AtomLoader />}
            {professional && (
                <div id='professional'>
                    <MolProfessionalHeader 
                        professional={professional} 
                        size='large'
                    />
                </div>
            )}
        </OrgDefault>
    )
}