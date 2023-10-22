import { Link, Typography } from '@mui/material'
import { useState } from 'react'
import { useApi, usePerson, useSnackbar } from 'src/app/hooks'
import { Attendance } from 'src/types'
import { AtomButton, AtomEmpty, AtomMeetingForm, MeetingForm, MolMeeting } from 'src/app/components'
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

                        { createModal && (
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

            { !data.meetings || data.meetings.length === 0 && (
                <AtomEmpty title='Nenhum Encontro!'>
                    No momento, não há nenhum encontro registrado. 
                    Para adicionar um encontro, utilize o botão acima ou <Link onClick={() => setCreateModal(true)}>clique aqui</Link>
                </AtomEmpty>
            )}

            { data.meetings && data.meetings.length > 0 && (
                <div id='content'>
                    { data.meetings.map(meeting => (
                        <MolMeeting
                            key={meeting.id}
                            allowEdit={isActive}
                            data={meeting}
                            reload={reload}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}