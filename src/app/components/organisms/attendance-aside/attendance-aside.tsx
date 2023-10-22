import { usePerson } from 'src/app/hooks'
import { Attendance } from 'src/types'
import { MolProfessionalDisplay } from '../../molecules/professional-display/professional-display'
import { MolUserDisplay } from '../../molecules/user-display/user-display'
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Menu } from './types/menu'
import DescriptionIcon from '@mui/icons-material/Description'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import ChecklistIcon from '@mui/icons-material/Checklist'
import EventIcon from '@mui/icons-material/Event'
import DeleteIcon from '@mui/icons-material/Delete'
import ChatIcon from '@mui/icons-material/Chat'
import VideoChatIcon from '@mui/icons-material/VideoChat'
import './attendance-aside.scss'
import { AtomButton } from '../../atoms/button/button'

type Props = {
    data: Attendance
    menuValue: string
    setMenuValue: (value: string) => void
}

export const OrgAttendanceAside = ({
    data,
    menuValue,
    setMenuValue
}: Props) => {

    const { person } = usePerson()

    const menus: Menu[] = [
        {
            label: 'Detalhes',
            value: 'details',
            icon: <DescriptionIcon />
        },
        { 
            label: 'Prontuário',
            value: 'medical-record',
            icon: <MedicalInformationIcon />
        },
        { 
            label: 'Afazeres',
            value: 'follow-up',
            icon: <ChecklistIcon />
        },
        { 
            label: 'Encontros',
            value: 'meetings',
            icon: <EventIcon />
        },
        { 
            label: 'Encerrar acompanhamento',
            value: 'delete',
            icon: <DeleteIcon />
        }
    ]

    return (
        <aside id='mol-attendance-aside'>
            { person?.type === 'user' && (
                <MolProfessionalDisplay
                    professional={data.professional}
                    size='x-small'
                />
            )}

            { person?.type === 'professional' && (
                <MolUserDisplay
                    user={data.user}
                    size='x-small'
                />
            )}

            <div id='communications'>
                <AtomButton>
                    <ChatIcon />
                    Chat
                </AtomButton>
                <AtomButton>
                    <VideoChatIcon />
                    Chamada
                </AtomButton>
            </div>

            <List>
                { menus.map(menu => (
                    <ListItem 
                        key={menu.value}
                        { ...menuValue === menu.value && { className: 'active' }}
                    >
                        <ListItemButton onClick={() => setMenuValue(menu.value)}>
                            <ListItemIcon>
                                { menu.icon }
                            </ListItemIcon>
                            <ListItemText>
                                { menu.label }
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </aside>
    )
}