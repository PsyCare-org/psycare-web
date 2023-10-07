import { CssBaseline, ThemeProvider } from '@mui/material'
import { customTheme } from './constants/custom-theme'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './app/providers/user'
import { SnackbarProvider } from './app/providers/snackbar'
import './App.scss'
import { Router } from './app/router'

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <UserProvider>
                <SnackbarProvider>
                    <Router/>
                </SnackbarProvider>
            </UserProvider>
            <CssBaseline />
        </ThemeProvider>
    )
}

export default App
