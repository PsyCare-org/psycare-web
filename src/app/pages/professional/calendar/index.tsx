import { Tooltip, Typography } from '@mui/material'
import { MolCalendar } from 'src/app/components/molecules/calendar/calendar'
import { Attendance, CalendarHour, OccupiedHour } from 'src/types'
import CheckIcon from '@mui/icons-material/Check'
import RemoveIcon from '@mui/icons-material/Remove'
import './styles.scss'
import { useApi, useSnackbar, usePerson, useUtils } from 'src/app/hooks'
import { useEffect, useState } from 'react'
import { AtomButton, AtomModal } from 'src/app/components'
import { AttendanceStatus } from 'src/enums'

type Props = {
    attendances: Attendance[]
    professionalId: number
    occupiedHours: OccupiedHour[]
}

export const ProfessionalCalendar = ({
    attendances,
    professionalId,
    occupiedHours
}: Props) => {

    const { person } = usePerson()
    const { post } = useApi()
    const { createSnack } = useSnackbar()
    const { formatCalendarHour, formatDate } = useUtils()

    const [shouldBlock, setShouldBlock] = useState<boolean>(false)
    const [attendance, setAttendance] = useState<Attendance | null>(null)
    const [modal, setModal] = useState<boolean>(false)
    const [calendarHour, setCalendarHour] = useState<CalendarHour | null>(null)

    const openModal = (calendarHour: CalendarHour) => {
        setModal(true)
        setCalendarHour(calendarHour)
    }

    const createAttendance = () => {
        const payload = {
            calendarHour,
            userId: person?.id,
            professionalId
        }

        post('/attendance', payload).then(() => {
            createSnack('Solicitação enviada com sucesso!', 'success')
            setModal(false)
            setShouldBlock(true)
        })
    }

    useEffect(() => {
        const newShouldBlock = !!occupiedHours.find(el => el.userId === person?.id)
        setShouldBlock(newShouldBlock)

        const newAttendance = attendances.find(el => el.userId === person?.id) || null
        setAttendance(newAttendance)
    }, [])

    return (
        <div id='professional-calendar'>
            <Typography variant='h5'>
                Horários
            </Typography>

            <div id='calendar-wrap'>
                <MolCalendar border={false} { ...shouldBlock && { className: 'should-block' } }>
                    {(calendarHour, label) => {
                        const isOccupied = occupiedHours.find(el => el.calendarHour === calendarHour)

                        return (
                            <Tooltip title={isOccupied ? 'Horário ocupado' : label}>
                                {isOccupied
                                    ? (
                                        <div className='occupied-hour'>
                                            <RemoveIcon />
                                        </div>
                                    )
                                    : (
                                        <div className='free-hour' onClick={() => openModal(calendarHour)}>
                                            <CheckIcon />
                                        </div>
                                    )
                                }
                            </Tooltip>
                        )
                    }}
                </MolCalendar>

                <div id='subtitles'>
                    <Typography variant='subtitle1'>
                        Legenda:
                    </Typography>
                    <div id='items'>
                        <div className='item'>
                            <RemoveIcon />
                            <Typography variant='body1'>
                                →
                            </Typography>
                            <Typography variant='body2'>
                                Horário ocupado
                            </Typography>
                        </div>
                        <div className='item'>
                            <CheckIcon />
                            <Typography variant='body1'>
                                →
                            </Typography>
                            <Typography variant='body2'>
                                Horário disponível
                            </Typography>
                        </div>
                    </div>
                </div>

                { shouldBlock && attendance && (
                    <div id='blocker'>
                        { attendance.status === AttendanceStatus.active && (
                            <>
                                <Typography>
                                    Você já está em acompnhamento com esse profissional.
                                </Typography>
                                <Typography>
                                    Seus encontros semanais estão programados para ocorrer toda { formatCalendarHour(attendance.calendarHour, false) }.
                                </Typography>
                                <AtomButton variant='contained'>
                                    Ver acompanhamento
                                </AtomButton>
                            </>
                        )}

                        { attendance.status === AttendanceStatus.pending && (
                            <>
                                <Typography>
                                    Você já enviou uma solicitação de acompanhamento para esse profissional.
                                </Typography>
                                <Typography>
                                    A solicitação foi feita em { formatDate(attendance.createdAt) }.
                                </Typography>
                            </>
                        )}
                    </div>
                )}
            </div>

            <AtomModal 
                value={modal} 
                setValue={setModal} 
                title='Confirmação de Solicitação de Acompanhamento?'
                confirmBtnClick={createAttendance}
            >
                <Typography variant='body1'>
                    Você está prestes a enviar uma solicitação de acompanhamento ao profissional, por favor, certifique-se de que as informações estejam corretas antes de prosseguir. Após a confirmação, o profissional receberá sua solicitação e avaliará os próximos passos.
                </Typography>
            </AtomModal>
        </div>
    )
}