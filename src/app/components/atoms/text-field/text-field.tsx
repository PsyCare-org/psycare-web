import { InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { ReactNode, RefObject, forwardRef } from 'react'

type Props = {
    startAdornment?: ReactNode
    endAdornment?: ReactNode
} & Omit<TextFieldProps, 'InputProps'>

export const AtomTextField = forwardRef((
    {
        multiline,
        startAdornment,
        endAdornment,
        ...props
    }: Props, 
    ref
) => {
    return (
        <TextField
            {...props}
            ref={ref as RefObject<HTMLDivElement>}
            {...(startAdornment || endAdornment) && {
                InputProps: {
                    ...startAdornment && {
                        startAdornment: (
                            <InputAdornment position='start'>
                                { startAdornment }
                            </InputAdornment>
                        )
                    },
                    ...endAdornment && {
                        endAdornment: (
                            <InputAdornment position='end'>
                                { endAdornment }
                            </InputAdornment>
                        )
                    }
                }
            }}
            {...multiline && { multiline: true }}
        />
    )
})

AtomTextField.displayName = 'AtomTextField'