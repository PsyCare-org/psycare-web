import { Attendance } from 'src/types'
import { 
    BreadcrumbItem,
    OrgDefault,
    AtomLoader,
    OrgAttendanceAside,
    MolAttendanceMedicalRecord,
    MolAttendanceFollowUp,
    MolAttendanceMeetings,
    MolAttendanceDelete, 
    MolAttendanceDetails
} from 'src/app/components'
import { useState } from 'react'
import './attendance.scss'

type Props = {
    breadcrumbs: BreadcrumbItem[] | undefined
    data?: Attendance
}

export const TemAttendance = ({
    breadcrumbs,
    data
}: Props) => {

    const [menuValue, setMenuValue] = useState<string>('medical-record')

    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            { !data && <AtomLoader /> }

            { data && (
                <div id='attendance'>
                    <OrgAttendanceAside 
                        data={data}
                        menuValue={menuValue}
                        setMenuValue={setMenuValue}
                    />

                    <div className='content'>
                        { menuValue === 'details' && (
                            <MolAttendanceDetails data={data} />
                        )}

                        { menuValue === 'medical-record' && (
                            <MolAttendanceMedicalRecord data={data} />
                        )}
                        
                        { menuValue === 'follow-up' && (
                            <MolAttendanceFollowUp data={data} />
                        )}

                        { menuValue === 'meetings' && (
                            <MolAttendanceMeetings data={data} />
                        )}

                        { menuValue === 'delete' && (
                            <MolAttendanceDelete data={data} />
                        )}
                    </div>
                </div>
            )}
        </OrgDefault>
    )
}