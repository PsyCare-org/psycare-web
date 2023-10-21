import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BreadcrumbItem, TemAttendance } from 'src/app/components'
import { useApi, usePerson } from 'src/app/hooks'
import { Attendance as Attendance_, Professional, User } from 'src/types'

export const Attendance = () => {

    const { id } = useParams()
    const { person } = usePerson()
    const { get } = useApi()

    const [data, setData] = useState<Attendance_ | undefined>(undefined)
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | undefined>(undefined)

    const loadData = () => {
        get(`/attendance/${id}`).then((res: Attendance_) => {
            setData(res)

            const firtLabel = person?.type === 'user' ? 'Acompanhamentos' : 'Pacientes'
            const otherPerson: Professional | User = person?.type === 'user' ? res.professional : res.user
            const secondLabel = `${otherPerson.name} ${otherPerson.surname || ''}`

            setBreadcrumbs([
                { active: true, label: firtLabel, url: '/attendances' },
                { active: false, label: secondLabel, url: `/attendances/${id}` }
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