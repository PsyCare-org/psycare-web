import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { RefObject, forwardRef } from 'react'

type Props = {
    label?: string
    options?: Array<{ label: string, value: any }>
    helperText?: string
} &  Omit<SelectProps, 'children' | 'label'>

export const SelectFieldAtom = forwardRef((
    {
        label,
        options,
        helperText,
        error,
        ...selectProps
    }: Props,
    ref
) => {
    const labelId = `${selectProps.id}-label`

    return (
        <FormControl error={error}>
            <InputLabel id={labelId} required={selectProps.required}>
                { label }
            </InputLabel>

            <Select
                {...selectProps}
                labelId={labelId}
                label={label}
                ref={ref as RefObject<HTMLDivElement>}
            >
                {options && options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        { option.label }
                    </MenuItem>
                ))}
            </Select>
            { helperText && (
                <FormHelperText>{ helperText }</FormHelperText>
            )}
        </FormControl>
    )
})

SelectFieldAtom.displayName  = 'SelectFieldAtom'