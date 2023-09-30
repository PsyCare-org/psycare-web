import { useContext } from 'react'
import { SnackbarContext } from '../contexts/snackbar'

export function useSnackbar() {
    return useContext(SnackbarContext)
}