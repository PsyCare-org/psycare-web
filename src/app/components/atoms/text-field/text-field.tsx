import { InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { ReactNode, RefObject, forwardRef } from 'react'
import './text-field.scss'

type Props = {
    startAdornment?: ReactNode
    endAdornment?: ReactNode
} & Omit<TextFieldProps, 'InputProps'>

export const AtomTextField = forwardRef((
    {
        multiline,
        startAdornment,
        endAdornment,
        id,
        ...props
    }: Props, 
    ref
) => {
    return (
        <div {...id && { id: id }} className='atom-text-field'>
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
        </div>
    )
})

AtomTextField.displayName = 'AtomTextField'