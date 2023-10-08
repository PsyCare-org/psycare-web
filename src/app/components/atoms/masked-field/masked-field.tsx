import { TextFieldProps } from '@mui/material'
import { ReactNode, forwardRef } from 'react'
import ReactInputMask from 'react-input-mask'
import { AtomTextField } from '../text-field/text-field'
import './masked-field.scss'

type Props = {
    mask: string | (string | RegExp)[]
    startAdornment?: ReactNode
    endAdornment?: ReactNode
} & Omit<TextFieldProps, 'InputProps'>

export const MaskedField = forwardRef((
    {
        id,
        mask,
        name,
        onBlur,
        onChange,
        value,
        disabled,
        ...props
    }: Props, 
    ref
) => {

    const maskProps: any = {
        onBlur,
        onChange,
        value,
        disabled,
    }

    return (
        <div {...id && { id: id }} className='atom-text-field'>
            <ReactInputMask mask={mask} {...maskProps}>
                <AtomTextField
                    {...props}
                    ref={ref}
                />
            </ReactInputMask>
        </div>
    )
})

MaskedField.displayName = 'MaskedField'