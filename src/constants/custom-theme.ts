import { Theme, createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const customTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            50: '#e7e0f0',
            100: '#c4b3db',
            200: '#9d80c3',
            300: '#754daa',
            400: '#582698',
            500: '#3a0086',
            600: '#34007e',
            700: '#2c0073',
            800: '#250069',
            900: '#180056',
            A100: '#9e88ff',
            A200: '#7555ff',
            A400: '#4b22ff',
            A700: '#3608ff',
            'contrastText': 'white'
        },
        secondary: {
            50: '#f0f7e4',
            100: '#dbebbd',
            200: '#c3de91',
            300: '#aad164',
            400: '#98c743',
            500: '#86bd22',
            600: '#7eb71e',
            700: '#73ae19',
            800: '#69a614',
            900: '#56980c',
            A100: '#e2ffc7',
            A200: '#c8ff94',
            A400: '#aeff61',
            A700: '#a1ff47',
            'contrastText': 'black'
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                'asterisk': {
                    color: red[500]
                }
            }
        }
    }
})
