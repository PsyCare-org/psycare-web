import { useParams } from 'react-router-dom'
import { useApi, usePerson } from 'src/app/hooks'
import { useEffect, useState } from 'react'
import { MeetingConsumer, MeetingProvider } from '@videosdk.live/react-sdk'
import { env } from 'src/constants'
import { AtomLoader, BreadcrumbItem, OrgDefault } from 'src/app/components'
import { Attendance, Professional, User } from 'src/types'
import { CallContainer } from './components/container'
import './styles.scss'

export const Call = () => {

    const { id } = useParams()
    const { person } = usePerson()
    const { get } = useApi()

    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | null>(null)
    const [attendance, setAttendance] = useState<Attendance | null>(null)
    const [room, setRoom] = useState<any | null>(null)

    useEffect(() => {
        Promise.all([
            get(`/call/${id}`), 
            get(`/attendance/${person?.type}/${id}`)
        ]).then(([room, attendance]: any) => {
            setRoom(room)
            setAttendance(attendance)

            const firtLabel = person?.type === 'user' ? 'Acompanhamentos' : 'Pacientes'
            const otherPerson: Professional | User = person?.type === 'user' ? attendance.professional : attendance.user
            const secondLabel = `${otherPerson.name} ${otherPerson.surname || ''}`

            setBreadcrumbs([
                { active: true, label: firtLabel, url: '/attendances' },
                { active: true, label: secondLabel, url: `/attendances/${id}` },
                { active: false, label: 'Chamada', url: `/attendances/${id}/call` },
            ])
        })
    }, [])

    return (
        <OrgDefault { ...breadcrumbs && { breadcrumbs } }>
            <div id='meeting'>
                { !room && (
                    <div id='loading'>
                        <AtomLoader color='primary' />
                    </div>
                )}

                { attendance && room && env.callToken && (
                    <MeetingProvider
                        config={{
                            meetingId: room.roomId,
                            micEnabled: false,
                            webcamEnabled: false,
                            name: `${person?.name}@${person?.type}`
                        }}
                        token={env.callToken}
                    >
                        <MeetingConsumer>
                            { () => <CallContainer attendance={attendance} callId={room.id} /> }
                        </MeetingConsumer>
                    </MeetingProvider>
                )}
            </div>
        </OrgDefault>
    )
}