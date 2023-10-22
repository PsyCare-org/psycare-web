import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ReactNode, SetStateAction } from 'react'
import './modal.scss'

type Props = {
    value: boolean
    setValue: (value: SetStateAction<boolean>) => void
    title: string
    children: ReactNode
    showButtons?: boolean
    cancelBtnLabel?: string
    confirmBtnLabel?: string
    confirmBtnColor?: 'inherit' | 'primary' | 'error' | 'secondary' | 'success' | 'info' | 'warning'
    confirmBtnVariant?: 'text' | 'outlined' | 'contained'
    confirmBtnForm?: string
    confirmBtnDisabled?: boolean
    confirmBtnClick?: () => void
}

export const AtomModal = ({
    value,
    setValue,
    title,
    children,
    showButtons = true,
    cancelBtnLabel = 'Cancelar',
    confirmBtnClick,
    confirmBtnLabel = 'Confirmar',
    confirmBtnVariant = 'outlined',
    confirmBtnColor = 'primary',
    confirmBtnDisabled = false,
    confirmBtnForm,
}: Props) => {
    return (
        <Dialog 
            id='atom-modal'
            open={value} 
            onClose={() => setValue(false)}
        >
            <DialogTitle>
                { title }
            </DialogTitle>

            <DialogContent>
                { children }
            </DialogContent>

            { showButtons && (
                <DialogActions>
                    <Button onClick={() => setValue(false)}>
                        { cancelBtnLabel }
                    </Button>

                    <Button 
                        variant={confirmBtnVariant}
                        color={confirmBtnColor} 
                        onClick={confirmBtnClick}
                        disabled={confirmBtnDisabled}
                        { ...confirmBtnForm && { form: confirmBtnForm } }
                    >
                        { confirmBtnLabel }
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    )
}