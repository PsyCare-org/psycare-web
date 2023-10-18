import { useState } from 'react'
import { Attendance } from 'src/types'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip } from '@mui/material'
import { AtomButton, AtomModal } from 'src/app/components'
import { useApi, useSnackbar, useUtils } from 'src/app/hooks'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import './styles.scss'
import { AttendanceStatus } from 'src/enums'

type Props = {
    data: Attendance[]
    reload: () => void
}

export const PatientsPending = ({ data, reload }: Props) => {

    const { calcAge } = useUtils()
    const { patch } = useApi()
    const { createSnack } = useSnackbar()

    const [modal, setModal] = useState<boolean>(false)

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
            <Tooltip title={data.length === 0 ? 'Você não possui solicitação de atendimento' : ''}>
                <AtomButton
                    variant='text'
                    disabled={data.length === 0}
                    onClick={() => setModal(true)}
                >
                    Solicitações de atendimento
                </AtomButton>
            </Tooltip>

            <AtomModal
                value={modal}
                setValue={setModal}
                showButtons={false}
                title='Solicitações de atendimento'
            >
                <List id='patients-pending'>
                    { data.map(attendance => (
                        <ListItem key={attendance.user.id}>
                            <ListItemAvatar>
                                <Avatar src={attendance.user.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${attendance.user.name} ${attendance.user.surname}`}
                                secondary={`${calcAge(attendance.user.birthDate)} | ${attendance.user.gender}`}
                            />
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
                        </ListItem>
                    ))}                    
                </List>
            </AtomModal>
        </div>
    )
}