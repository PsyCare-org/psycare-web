import { AppBar, Toolbar } from '@mui/material'
import { AtomLogo } from '../../atoms/logo/logo'
import { HeaderPages } from '../../atoms/header-pages/header-pages'
import { HeaderMenus } from '../../atoms/header-menus/header-menus'
import './header.scss'

export const MolHeader = () => (
    <AppBar 
        id='mol-header' 
        position='sticky' 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <AtomLogo type='full-2'/>

            <HeaderPages />

            <div id='spacer'></div>

            <HeaderMenus />
        </Toolbar>
    </AppBar>
)