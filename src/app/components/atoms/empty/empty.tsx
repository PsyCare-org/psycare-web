import { Typography } from '@mui/material'
import { ReactNode } from 'react'
import './empty.scss'

type Props = {
    title: string
    children: ReactNode
}

export const AtomEmpty = ({
    title,
    children
}: Props) => {
    return (
        <div id='atom-empty'>
            <Typography variant='h6'>
                { title }
            </Typography>
            <Typography variant='body1'>
                { children }
            </Typography>
        </div>
    )
}