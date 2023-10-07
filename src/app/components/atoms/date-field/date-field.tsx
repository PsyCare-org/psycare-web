import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers'
import { RefObject, forwardRef } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'

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
        error,
        helperText,
        disableTyping = false,
        required = false,
        ...props
    }: Props,
    ref
) => {
    return (
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
    )
})

AtomDateField.displayName = 'AtomDateField'