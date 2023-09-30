import { AlertColor } from '@mui/material'
import { createContext } from 'react'

type SnackbarContextType = {
    createSnack: (message: string, type: AlertColor) => void
    handleClose: () => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
    createSnack: (message: string, type: AlertColor) => {},
    handleClose: () => {}
})