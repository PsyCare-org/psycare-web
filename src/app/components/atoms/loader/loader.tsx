import { CircularProgress, CircularProgressProps } from '@mui/material'

type Props = {
    color?: 'secondary' | 'primary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
    size?: string
} & Omit<CircularProgressProps, 'size' | 'color'>

export const AtomLoader = ({
    color = 'secondary',
    size = '100px',
    ...props
}: Props) => {
    return (
        <CircularProgress 
            color={color}
            size={size}
            { ...props }
        />
    )    
}