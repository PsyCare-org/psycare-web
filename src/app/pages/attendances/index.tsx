import { Typography } from '@mui/material'
import { BreadcrumbItem, OrgDefault } from 'src/app/components'
import { useApi, usePerson } from 'src/app/hooks'
import { useEffect, useState } from 'react'
import { SplittedAttendances } from './types/splitted-attendances'
import { AttendancesPending } from './components/pending'
import { AttendancesList } from './components/list'
import './styles.scss'

const breadcrumbs: BreadcrumbItem[] = [
    {
        active: false,
        label: 'Acompanhamentos',
        url: '/attendances'
    }
]

export const Attendances = () => {

    const { get } = useApi()
    const { person } = usePerson()

    const [attendances, setAttendances] = useState<SplittedAttendances | null>(null)

    useEffect(() => {
        get(`/attendance/${person?.type}/${person?.id}`).then(res => {
            setAttendances({
                active: res.data.active,
                pending: res.data.pending
            })
        })
    }, [])

    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            <div id='attendances'>
                <div id='head'>
                    <div id='title'>
                        <Typography variant='h4'>
                            Acompanhamentos
                        </Typography>
                        <Typography variant='body1' color='text.secondary'>
                            Aqui você encontra informações sobre os seus acompanhamentos em andamento e as solicitações pendentes.
                        </Typography>
                    </div>

                    { attendances && (
                        <AttendancesPending data={attendances.pending}/>
                    )}
                </div>

                { attendances && (
                    <AttendancesList data={attendances.active} />
                )}
            </div>            
        </OrgDefault>
    )
}