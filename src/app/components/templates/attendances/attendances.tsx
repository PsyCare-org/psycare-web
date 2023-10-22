import { ReactNode } from 'react'
import { BreadcrumbItem } from '../../molecules/breadcrumb/breadcrumb'
import { OrgDefault } from '../../organisms/default/default'
import { Attendance } from 'src/types'
import { MolAttendanceCard } from '../../molecules/attendance-card/attendance-card'
import { Typography } from '@mui/material'
import { AtomEmpty } from '../../atoms/empty/empty'
import './attendances.scss'

export type TemAttendancesProps = {
    breadcrumbs: BreadcrumbItem[]
    title: ReactNode
    subTitle: ReactNode
    headButton?: ReactNode
    data: Attendance[] | null
    onAttendanceClick: (attendance: Attendance) => void
    emptyTitle: ReactNode
    emptyDescription: ReactNode
}

export const TemAttendances = ({
    breadcrumbs,
    title,
    subTitle,
    headButton,
    data,
    onAttendanceClick,
    emptyTitle,
    emptyDescription
}: TemAttendancesProps) => {
    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            <div id='tem-attendances'>
                <div id='head'>
                    <div id='title'>
                        <Typography variant='h4'>
                            { title }
                        </Typography>
                        <Typography variant='body1' color='text.secondary'>
                            { subTitle }
                        </Typography>
                    </div>

                    { headButton && (
                        headButton
                    )}
                </div>

                <div id='content'>
                    { data && data.length > 0 && (
                        <div id='list'>
                            {data.map(attendance => (
                                <MolAttendanceCard 
                                    key={attendance.id} 
                                    attendance={attendance}
                                    onClick={onAttendanceClick}
                                />
                            ))}
                        </div>
                    )}

                    { data && data.length == 0 && (
                        <AtomEmpty title={emptyTitle}>
                            { emptyDescription }
                        </AtomEmpty>
                    )}
                </div>
            </div>
        </OrgDefault>
    )
}