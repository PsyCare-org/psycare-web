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
    MolAttendanceDetails,
    MolAttendanceRating
} from 'src/app/components'
import { useState } from 'react'
import './attendance.scss'

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
                            <MolAttendanceMedicalRecord data={data} />
                        )}
                        
                        { menuValue === 'follow-up' && (
                            <MolAttendanceFollowUp data={data} />
                        )}

                        { menuValue === 'meetings' && (
                            <MolAttendanceMeetings data={data} />
                        )}

                        { menuValue === 'rating' && (
                            <MolAttendanceRating data={data} reload={onReloadData} />
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