import { Theme, createTheme } from '@mui/material'

export const customTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#8f09a7',
            light: '#c78bd3',
            dark: '#3a0086',
            contrastText: '#000'
        },
        secondary: {
            main: '#86bd22',
            light: '#c3dd97',
            dark: '#236500',
            contrastText: '#000'
        }
    }
})
