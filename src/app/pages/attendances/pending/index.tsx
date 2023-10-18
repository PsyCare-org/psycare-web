import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { AtomButton, AtomModal } from 'src/app/components'
import { Attendance } from 'src/types'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

type Props = {
    data: Attendance[]
}

export const AttendancesPending = ({ data }: Props) => {

    const navigate = useNavigate()

    const [modal, setModal] = useState<boolean>(false)

    return (
        <div id='attendances-pending'>
            <Tooltip title={data.length === 0 ? 'Você não possui acompanhamentos pendentes' : ''}>
                <AtomButton
                    variant='text'
                    disabled={data.length === 0}
                    onClick={() => setModal(true)}
                >
                    Solicitações pendentes
                </AtomButton>
            </Tooltip>

            <AtomModal
                value={modal}
                setValue={setModal}
                showButtons={false}
                title='Acompanhamentos Pendentes'
            >
                <Typography variant='body1'>
                    Os acompanhamentos aqui ainda estão em análise pelo profissional.
                </Typography>

                <List>
                    { data.map(attendance => (
                        <ListItem key={attendance.professional.id}>
                            <ListItemAvatar>
                                <Avatar src={attendance.professional.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${attendance.professional.name} ${attendance.professional.surname}`}
                                secondary={`Solicitado em: ${new Date(attendance.createdAt).toLocaleString()}`}
                            />
                            <ListItemSecondaryAction>
                                <Tooltip title='Ver perfil do profissional'>
                                    <IconButton onClick={() => navigate(`/professionals/${attendance.professional.id}`)}>
                                        <NavigateNextIcon />
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