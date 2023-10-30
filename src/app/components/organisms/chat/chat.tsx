import { Attendance } from 'src/types'
import { MolChatHead, MolChatList, MolChatActions } from 'src/app/components'
import './chat.scss'

type Props = {
    attendance: Attendance
    showHead?: boolean
}

export const OrgChat = ({
    attendance,
    showHead = true
}: Props) => {
    return (
        <div id='org-chat'>
            { showHead && <MolChatHead attendance={attendance} /> }

            <MolChatList attendance={attendance} />

            <MolChatActions attendance={attendance} />
        </div>
    )
}