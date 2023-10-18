import { Avatar, Typography } from '@mui/material'
import { User } from 'src/types'
import { UserDisplaySize } from './types/size'
import { UserDisplayTypography } from './types/typography'
import './user-display.scss'
import dayjs from 'dayjs'
import { useUtils } from 'src/app/hooks'

type Props = {
    size?: UserDisplaySize
    user: User
}

export const MolUserDisplay = ({
    size = 'normal',
    user
}: Props) => {

    const { calcAge } = useUtils()

    const typography: UserDisplayTypography = {
        small: {
            title: 'h6',
            text: 'body2'
        },
        normal: {
            title: 'h5',
            text: 'body2'
        },
        large: {
            title: 'h4',
            text: 'body1'
        }
    }

    return (
        <div id='mol-professional-display'>
            <Avatar 
                src={user.avatar}
                className={`${size}-size`}
            />

            <div id='text'>
                <Typography variant={typography[size].title}>
                    {user.name} {user.surname}
                </Typography>

                <Typography variant={typography[size].text} color='text.secondary'>
                    {user.gender}
                </Typography>

                <Typography id='crp' variant={typography[size].text} color='text.secondary'>
                    { calcAge(user.birthDate) }
                </Typography>
            </div>
        </div>
    )
}