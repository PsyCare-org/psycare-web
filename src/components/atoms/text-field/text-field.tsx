import { InputAdornment, TextField } from '@mui/material'
import { ReactNode, RefObject, createRef, forwardRef, useRef } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
    autoFocus?: boolean
    id?: string
    type?: string
    label: string
    error?: boolean
    helperText?: string
    startAdornment?: ReactNode
    endAdornment?: ReactNode
} & ControllerRenderProps<any, any>

export const TextFieldAtom = forwardRef((
    {
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
        />
    )
})

TextFieldAtom.displayName = 'TextFieldAtom'