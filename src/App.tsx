import { ThemeProvider } from '@emotion/react'
import { customTheme } from './constants/custom-theme'
import { RouterProvider } from 'react-router-dom'
import { router } from './constants/router'
import { UserProvider } from './app/providers/user'
import './App.scss'

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <UserProvider>
                <RouterProvider router={router}/>
            </UserProvider>
        </ThemeProvider>
    )
}

export default App
