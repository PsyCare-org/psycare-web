import { Rating } from '@mui/material'

type Props = {
    size?: 'small' | 'medium' | 'large'
    value?: number
    onChange?: (value: number | null) => void
}

export const AtomRating = ({
    size = 'small',
    value,
    onChange
}: Props) => {
    return (
        <Rating
            size={size}
            value={value}
            precision={0.1}
            { ...onChange
                ? { onChange: (_, value) => onChange(value) }
                : { readOnly: true }
            }
        />
    )
}