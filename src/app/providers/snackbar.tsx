import { Alert, AlertColor, Snackbar as MuiSnackbar, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import { SnackbarContext } from '../contexts/snackbar'

type Props = {
    children: ReactNode
}

type Snackbar = {
    message: string
    type: AlertColor
    open: boolean
    onClose?: () => void
}

export const SnackbarProvider = ({ children }: Props) => {
    const [ snack, setSnack ] = useState<Snackbar | null>(null)

    const createSnack = (message: string, type: AlertColor) => setSnack({ message, type, open: true })

    const handleClose = () => setSnack(null)

    return (
        <SnackbarContext.Provider value={{createSnack, handleClose}}>
            { snack && (
                <MuiSnackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={snack.open}
                    onClose={handleClose}
                    autoHideDuration={6000}
                >
                    <Alert 
                        severity={snack.type} 
                        variant="filled"
                    >
                        <Typography variant='body2'>
                            { snack.message }
                        </Typography>
                    </Alert>
                </MuiSnackbar>
            )}
            { children }
        </SnackbarContext.Provider>
    )
}