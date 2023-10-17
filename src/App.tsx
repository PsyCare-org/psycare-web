import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from './app/providers/snackbar'
import { Router } from './app/router'
import { customTheme } from './constants'
import { PersonProvider } from './app/providers/person'
import './App.scss'

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <PersonProvider>
                <SnackbarProvider>
                    <Router/>
                </SnackbarProvider>
            </PersonProvider>
            <CssBaseline />
        </ThemeProvider>
    )
}

export default App
