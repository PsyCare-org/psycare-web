import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { AtomButton, AtomModal } from 'src/app/components'
import { useApi, usePerson, useSnackbar, useUtils } from 'src/app/hooks'
import { AttendanceStatus } from 'src/enums'
import { Attendance } from 'src/types'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

type Props = {
    data: Attendance[]
    reload: () => void
}

export const AttendancesPending = ({ data, reload }: Props) => {

    const { person } = usePerson()
    const { calcAge, formatDate } = useUtils()
    const { patch } = useApi()
    const { createSnack } = useSnackbar()
    const navigate = useNavigate()

    const [modal, setModal] = useState<boolean>(false)

    const isUser = person?.type === 'user'
    const personType = person?.type === 'user' ? 'professional' : 'user'

    const onSubmit = (attendance: Attendance, status: AttendanceStatus) => {
        const payload = {
            calendarHour: attendance.calendarHour,
            status
        }

        patch(`/attendance/${attendance.id}`, payload).then(() => {
            const statusLabel = status === AttendanceStatus.active ? 'aceita' : 'recusada'
            createSnack(`Solicitação ${statusLabel} com sucesso!`, 'success')
            reload()
            setModal(false)
        })
    }

    return (
        <div id='attendances-pending'>
            <AtomButton
                variant='text'
                disabled={data.length === 0}
                onClick={() => setModal(true)}
            >
                {isUser ? 'Solicitações pendentes' : 'Solicitações de atendimento'}
            </AtomButton>

            <AtomModal
                value={modal}
                setValue={setModal}
                showButtons={false}
                title={isUser ? 'Solicitações pendentes' : 'Solicitações de atendimento'}
            >
                {isUser && (
                    <Typography variant='body1'>
                        Os acompanhamentos aqui ainda estão em análise pelo profissional.
                    </Typography>
                )}

                <List { ...!isUser && { id: 'patients-pending' } }>
                    {data.map(attendance => (
                        <ListItem key={attendance.id}>
                            <ListItemAvatar>
                                <Avatar src={attendance[personType].avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${attendance[personType].name} ${attendance[personType].surname || ''}`}
                                {...isUser
                                    ? { secondary: `Solicitado em: ${formatDate(attendance.createdAt)}` }
                                    : { secondary: `${calcAge(attendance.user.birthDate)} | ${attendance.user.gender}` }
                                }
                            />
                            {isUser && (
                                <ListItemSecondaryAction>
                                    <Tooltip title='Ver perfil do profissional'>
                                        <IconButton onClick={() => navigate(`/professionals/${attendance.professional.id}`)}>
                                            <NavigateNextIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            )}
                            {!isUser && (
                                <ListItemSecondaryAction>
                                    <Tooltip title='Recusar'>
                                        <IconButton onClick={() => onSubmit(attendance, AttendanceStatus.closed)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Aceitar' color='primary'>
                                        <IconButton onClick={() => onSubmit(attendance, AttendanceStatus.active)}>
                                            <CheckIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                    ))}
                </List>
            </AtomModal>
        </div>
    )
}