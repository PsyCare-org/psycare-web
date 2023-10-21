import { usePerson } from 'src/app/hooks'
import { Attendance } from 'src/types'
import { OrgDefault } from '../../organisms/default/default'
import { BreadcrumbItem } from '../../molecules/breadcrumb/breadcrumb'
import { AtomLoader } from '../../atoms/loader/loader'

type Props = {
    breadcrumbs: BreadcrumbItem[] | undefined
    data?: Attendance
}

export const TemAttendance = ({
    breadcrumbs,
    data
}: Props) => {    
    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            { !data && <AtomLoader /> }

            { data && (
                <>{ data.status }</>
            )}
        </OrgDefault>
    )
}