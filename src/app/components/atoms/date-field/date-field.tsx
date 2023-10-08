import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers'
import { RefObject, forwardRef } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'
import './date-field.scss'

type Props = {
    id?: string
    type?: string
    label: string
    error?: boolean
    helperText?: string
    disableTyping?: boolean
    required?: boolean
} & DatePickerProps<any> & React.RefAttributes<HTMLDivElement>

export const AtomDateField = forwardRef((
    {
        id,
        error,
        helperText,
        disableTyping = false,
        required = false,
        ...props
    }: Props,
    ref
) => {
    return (
        <div {...id && { id: id }} className='atom-date-field'>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                <DatePicker
                    {...props}
                    ref={ref as RefObject<HTMLDivElement>}
                    slotProps={{
                        textField: {
                            error,
                            helperText,
                            required,
                            ...disableTyping && {
                                onKeyDown: e => e.preventDefault(),
                            },
                        }
                    }}
                />
            </LocalizationProvider>
        </div>
    )
})

AtomDateField.displayName = 'AtomDateField'