import { usePerson } from 'src/app/hooks'
import { Attendance } from 'src/types'
import { MolProfessionalDisplay } from '../../molecules/professional-display/professional-display'
import { MolUserDisplay } from '../../molecules/user-display/user-display'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import VideoChatIcon from '@mui/icons-material/VideoChat'
import { AtomButton } from '../../atoms/button/button'
import { AttendanceStatus } from 'src/enums'
import { useMenus } from './hooks/useMenus'
import './attendance-aside.scss'

type Props = {
    data: Attendance
    onReloadData: () => void
    menuValue: string
    setMenuValue: (value: string) => void
}

export const OrgAttendanceAside = ({
    data,
    onReloadData,
    menuValue,
    setMenuValue
}: Props) => {

    const { person } = usePerson()
    const { userMenus, professionalMenus } = useMenus()

    const menus = person?.type === 'user' ? userMenus : professionalMenus

    return (
        <aside id='mol-attendance-aside'>
            { person?.type === 'user' && (
                <MolProfessionalDisplay
                    professional={data.professional}
                    size='x-small'
                    showLangAndRating={false}
                />
            )}

            { person?.type === 'professional' && (
                <MolUserDisplay
                    user={data.user}
                    size='x-small'
                />
            )}

            { data.status === AttendanceStatus.active && (
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
            )}

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