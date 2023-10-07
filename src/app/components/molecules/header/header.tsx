import { AppBar, Toolbar } from '@mui/material'
import { AtomLogo } from '../../atoms/logo/logo'
import { HeaderPages } from '../../atoms/header-pages/header-pages'
import { HeaderMenus } from '../../atoms/header-menus/header-menus'
import './header.scss'

export const MolHeader = () => (
    <AppBar id='mol-header' position='sticky'>
        <Toolbar>
            <AtomLogo type='full-inverted'/>

            <HeaderPages />

            <div id='spacer'></div>

            <HeaderMenus />
        </Toolbar>
    </AppBar>
)