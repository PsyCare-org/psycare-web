import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { BreadcrumbItem, OrgDefault } from 'src/app/components'
import './styles.scss'
import { useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import PasswordIcon from '@mui/icons-material/Password'
import DeleteIcon from '@mui/icons-material/Delete'
import { Menu, MenuValue } from './types/menu'
import { ProfileAvatar } from './components/avatar'
import { ProfileData } from './components/data'
import { ProfileDelete } from './components/delete'
import { ProfilePassword } from './components/password'

const breadcrumbs: BreadcrumbItem[] = [
    {
        active: false,
        label: 'Perfil',
        url: '/profile'
    }
]

const menus: Menu[] = [
    { icon: <TextSnippetIcon/>, label: 'Dados', value: 'data' },
    { icon: <AccountBoxIcon/>, label: 'Avatar', value: 'avatar' },
    { icon: <PasswordIcon/>, label: 'Alterar senha', value: 'password' },
    { icon: <DeleteIcon/>, label: 'Excluir conta', value: 'delete' },
]

export const Profile = () => {
    const [menuValue, setMenuValue] = useState<MenuValue>('data')

    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            <div id='profile'>
                <aside>
                    <List>
                        { menus && menus.map(el => (
                            <ListItem key={el.value} {... menuValue === el.value && { className: 'active' }}>
                                <ListItemButton onClick={() => setMenuValue(el.value)}>
                                    <ListItemIcon>
                                        { el.icon }
                                    </ListItemIcon>
                                    <ListItemText>
                                        { el.label }
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </aside>
                <div id='content'>
                    { menuValue === 'avatar' && <ProfileAvatar/> }
                    { menuValue === 'data' && <ProfileData/> }
                    { menuValue === 'delete' && <ProfileDelete/> }
                    { menuValue === 'password' && <ProfilePassword/> }
                </div>
            </div>
        </OrgDefault>
    )
}