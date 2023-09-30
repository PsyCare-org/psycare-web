import { ThemeProvider } from '@emotion/react'
import { customTheme } from './constants/custom-theme'
import { RouterProvider } from 'react-router-dom'
import { router } from './constants/router'
import { UserProvider } from './app/providers/user'
import { SnackbarProvider } from './app/providers/snackbar'
import './App.scss'

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <UserProvider>
                <SnackbarProvider>
                    <RouterProvider router={router}/>
                </SnackbarProvider>
            </UserProvider>
        </ThemeProvider>
    )
}

export default App
