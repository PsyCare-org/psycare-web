import { Avatar, IconButton, Typography } from '@mui/material'
import { usePerson } from 'src/app/hooks'
import { Attendance } from 'src/types'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useState } from 'react'
import { MolAttendanceModal } from '../attendance-modal/attendance-modal'
import './chat-head.scss'

type Props = {
    attendance: Attendance
}

export const MolChatHead = ({ attendance }: Props) => {

    const { person } = usePerson()

    const otherPerson = person?.type === 'user' ? attendance.professional : attendance.user
    const otherPersonName = `${otherPerson.name} ${otherPerson.surname || ''}`

    const [modal, setModal] = useState<boolean>(false)

    return (
        <div id='mol-chat-head'>
            <Avatar src={otherPerson.avatar} />

            <Typography variant='body1'>
                {otherPersonName}
            </Typography>

            <div id='spacer'></div>

            <IconButton onClick={() => setModal(true)}>
                <InfoOutlinedIcon />
            </IconButton>

            <MolAttendanceModal
                attendance={attendance}
                flag={modal}
                setFlag={setModal}
                showChatBtn={false}
            />
        </div>
    )
}