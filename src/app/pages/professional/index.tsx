import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AtomLoader, BreadcrumbItem, MolProfessionalHeader, OrgDefault } from 'src/app/components'
import { useApi } from 'src/app/hooks'
import { Professional as Professional_ } from 'src/types'
import { ProfessionalCalendar } from './calendar'
import { ProfessionalProfile } from './profile'
import { ProfessionalRatings } from './ratings'
import './styles.scss'

export const Professional = () => {

    const { id } = useParams()
    const { get } = useApi()

    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | undefined>(undefined)
    const [professional, setProfessional] = useState<Professional_ | null>(null)

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
            { !professional && <AtomLoader /> }

            { professional && id && (
                <div id='professional'>
                    <MolProfessionalHeader professional={professional} size='large'/>

                    <ProfessionalProfile professional={professional} />

                    <ProfessionalCalendar 
                        professionalId={+id}
                        occupiedHours={professional.occupiedHours || []}
                    />

                    <ProfessionalRatings professional={professional} />
                </div>
            )}
        </OrgDefault>
    )
}