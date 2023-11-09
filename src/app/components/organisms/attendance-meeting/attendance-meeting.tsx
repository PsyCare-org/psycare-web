import { Card, CardContent, Link, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@mui/material'
import { useState } from 'react'
import { useApi, usePerson, useSnackbar } from 'src/app/hooks'
import { Attendance, Meeting } from 'src/types'
import { AtomButton, AtomEmpty, AtomMeetingForm, MeetingForm, MolMeeting, MolMeetingFilter } from 'src/app/components'
import { MeetingFilter } from '../../molecules/meeting-filter/types/meeting-filter'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
import './attendance-meeting.scss'

type Props = {
    data: Attendance
    isActive: boolean
    reload: () => void
}

export const MolAttendanceMeeting = ({
    data,
    isActive,
    reload
}: Props) => {

    const { person } = usePerson()
    const { post } = useApi()
    const { createSnack } = useSnackbar()

    const [createModal, setCreateModal] = useState<boolean>(false)

    const [meetings, setMeetings] = useState<Meeting[]>(data.meetings || [])

    const onCreate = (value: MeetingForm) => {
        const payload = {
            attendanceId: data.id,
            ...value
        }

        post('/meeting', payload).then(() => {
            createSnack('Encontro criado com sucesso!', 'success')
            setCreateModal(false)
            reload()
        })
    }

    const filterHandler = (filter: MeetingFilter) => {
        if(Object.keys(filter).length === 0) {
            setMeetings(data.meetings || [])
            return
        }

        const newMeetings = data.meetings?.filter(meeting => {
            const meetingDate = dayjs(meeting.dateTime)

            const startDateFlag = filter.startDate ? meetingDate.isSameOrAfter(filter.startDate) : true

            const endDateFlag = filter.endDate ? meetingDate.isSameOrBefore(filter.endDate) : true

            let keyWordFlag = true
            if(filter.keyword) {
                keyWordFlag = ['status', 'relatory', 'analisys', 'observations']
                    .map(field => {
                        const value: string = meeting[field as keyof Meeting]?.toString().toLowerCase() || ''
                        return value.includes(filter.keyword?.toLowerCase() || '')
                    })
                    .some(field => field)
            }

            return startDateFlag && endDateFlag && keyWordFlag
        })

        setMeetings(newMeetings || [])
    }

    return (
        <div id='mol-attendance-meeting'>
            <div id='head'>
                <div id='title'>
                    <Typography variant='h5'>
                        Encontros
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Aqui você encontrará um registro detalhado de todos os encontros realizados durante o acompanhamento. Este histórico de encontros é uma ferramenta valiosa para acompanhar seu progresso e rever discussões anteriores.
                    </Typography>
                </div>

                {person?.type === 'professional' && isActive && (
                    <>
                        <AtomButton onClick={() => setCreateModal(true)}>
                            Criar encontro
                        </AtomButton>

                        {createModal && (
                            <AtomMeetingForm
                                title='Criar Encontro'
                                confirmBtnLabel='Criar'
                                modal={createModal}
                                setModal={setCreateModal}
                                onSubmit={onCreate}
                            />
                        )}
                    </>
                )}
            </div>

            {!data.meetings || data.meetings.length === 0 && (
                <AtomEmpty title='Nenhum Encontro!'>
                    No momento, não há nenhum encontro registrado.
                    Para adicionar um encontro, utilize o botão acima ou <Link onClick={() => setCreateModal(true)}>clique aqui</Link>
                </AtomEmpty>
            )}

            {data.meetings && data.meetings.length > 0 && (
                <div id='content'>
                    <MolMeetingFilter onSubmit={filterHandler} />

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableCell>Data do encontro</TableCell>
                                <TableCell>Resumo</TableCell>
                                <TableCell />
                            </TableHead>
                            <TableBody>
                                { meetings.map(meeting => (
                                    <MolMeeting
                                        key={meeting.id}
                                        data={meeting}
                                        allowEdit={isActive}
                                        reload={reload}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    )
}