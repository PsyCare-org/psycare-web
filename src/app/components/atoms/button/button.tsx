import { Button, ButtonProps, CircularProgress } from '@mui/material'
type Props = {
    loading?: boolean
} & ButtonProps

export const AtomButton = ({
    loading,
    ...buttonProps
}: Props) => {
    return (
        <Button
            {...buttonProps}
            { ...loading && {
                disabled: true,
                children: <CircularProgress size='24.5px' />
            }}
        />
    )
}