import { Attendance } from 'src/types'
import { 
    BreadcrumbItem,
    OrgDefault,
    AtomLoader,
    OrgAttendanceAside,
    MolAttendanceMedicalRecord,
    MolAttendanceFollowUp,
    MolAttendanceDelete, 
    MolAttendanceDetails,
    MolAttendanceRating,
    MolAttendanceMeeting
} from 'src/app/components'
import { useState } from 'react'
import './attendance.scss'
import { AttendanceStatus } from 'src/enums'

type Props = {
    breadcrumbs: BreadcrumbItem[] | undefined
    data?: Attendance
    onReloadData: () => void
}

export const TemAttendance = ({
    breadcrumbs,
    onReloadData,
    data
}: Props) => {

    const [menuValue, setMenuValue] = useState<string>('details')

    const professionalName = `${data?.professional.name} ${data?.professional.surname || ''}`
    const patientName = `${data?.user.name} ${data?.user.surname || ''}`
    const isActive = data?.status === AttendanceStatus.active

    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            { !data && <AtomLoader /> }

            { data && (
                <div id='attendance'>
                    <OrgAttendanceAside 
                        data={data}
                        onReloadData={onReloadData}
                        menuValue={menuValue}
                        setMenuValue={setMenuValue}
                    />

                    <div className='content'>
                        { menuValue === 'details' && (
                            <MolAttendanceDetails data={data} />
                        )}

                        { menuValue === 'medical-record' && (
                            <MolAttendanceMedicalRecord 
                                data={data}
                                isActive={isActive}
                                patientName={patientName}
                                reload={onReloadData}
                            />
                        )}
                        
                        { menuValue === 'follow-up' && (
                            <MolAttendanceFollowUp 
                                data={data} 
                                isActive={isActive}
                                professionalName={professionalName}
                                reload={onReloadData}
                            />
                        )}

                        { menuValue === 'meetings' && (
                            <MolAttendanceMeeting
                                data={data}
                                isActive={isActive}
                                reload={onReloadData}
                            />
                        )}

                        { menuValue === 'rating' && (
                            <MolAttendanceRating 
                                data={data}
                                reload={onReloadData}
                            />
                        )}

                        { menuValue === 'delete' && (
                            <MolAttendanceDelete
                                data={data}
                                professionalName={professionalName}
                                patientName={patientName}
                            />
                        )}
                    </div>
                </div>
            )}
        </OrgDefault>
    )
}