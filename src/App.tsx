import { ThemeProvider } from '@emotion/react'
import { customTheme } from './constants/custom-theme'
import { RouterProvider } from 'react-router-dom'
import { router } from './constants/router'
import './App.scss'

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    )
}

export default App
