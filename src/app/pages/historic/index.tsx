import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BreadcrumbItem, TemAttendance } from 'src/app/components'
import { useApi, usePerson } from 'src/app/hooks'
import { Attendance, Professional, User } from 'src/types'

export const Historic = () => {

    const { id } = useParams()
    const { person } = usePerson()
    const { get } = useApi()

    const [data, setData] = useState<Attendance | undefined>(undefined)
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | undefined>(undefined)

    const loadData = () => {
        get(`/attendance/${id}`).then((res: Attendance) => {
            setData(res)

            const otherPerson: Professional | User = person?.type === 'user' ? res.professional : res.user
            const secondLabel = `${otherPerson.name} ${otherPerson.surname || ''}`

            setBreadcrumbs([
                { active: true, label: 'Histórico', url: '/historics' },
                { active: false, label: secondLabel, url: `/historics/${id}` }
            ])
        })
    }

    useEffect(() => {
        loadData()
    }, [])
    
    return (
        <TemAttendance
            breadcrumbs={breadcrumbs}
            data={data}
        />
    )
}