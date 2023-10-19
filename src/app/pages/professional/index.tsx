import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AtomLoader, BreadcrumbItem, MolProfessionalDisplay, OrgDefault } from 'src/app/components'
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
            console.log(res)
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
                    <MolProfessionalDisplay professional={professional} size='large'/>

                    <ProfessionalProfile professional={professional} />

                    <ProfessionalCalendar 
                        professionalId={+id}
                        occupiedHours={professional.occupiedHours || []}
                        attendances={professional.attendances || []}
                    />

                    <ProfessionalRatings professional={professional} />
                </div>
            )}
        </OrgDefault>
    )
}