import { Avatar, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { usePerson } from 'src/app/hooks'
import { Attendance } from 'src/types'
import SearchIcon from '@mui/icons-material/Search'
import './styles.scss'

type Props = {
    data: Attendance[]
    selected: Attendance | null
    onSelect: (value: Attendance) => void
}

export const MessagesAside = ({
    data,
    selected,
    onSelect
}: Props) => {

    const { person } = usePerson()

    const [search, setSearch] = useState<string>('')
    const [filteredData, setFilteredData] = useState<Attendance[]>(data)

    useEffect(() => {
        const newData = data.filter(el => {
            const otherPerson = person?.type === 'user' ? el.professional : el.user
            const otherPersonName = `${otherPerson.name} ${otherPerson.surname || ''}`

            const nameFilter = otherPersonName.toLowerCase().includes(search.toLowerCase())
            const messageFilter = !!el.lastMessage?.content.toLowerCase().includes(search.toLowerCase())

            return nameFilter || messageFilter
        })

        setFilteredData(newData)
    }, [search])

    return (
        <aside id='messages-aside'>
            <TextField
                placeholder='Pesquisar mensagens'
                value={search}
                onChange={evt => setSearch(evt.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <SearchIcon/>
                        </InputAdornment>
                    )
                }}
            />

            <List>
                { filteredData.map((attendance) => {
                    const otherPerson = person?.type === 'user' ? attendance.professional : attendance.user

                    return (
                        <ListItemButton 
                            key={attendance.id}
                            className={selected?.id === attendance.id ? 'active' : ''}
                            onClick={() => onSelect(attendance)}
                        >
                            <ListItemAvatar>
                                <Avatar src={otherPerson.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${otherPerson.name} ${otherPerson.surname || ''}`}
                                secondary={attendance.lastMessage?.content || '...'}
                                className={attendance.lastMessage?.content ? '' : 'empty-last-msg'}
                            />
                        </ListItemButton>
                    )
                })}
            </List>
        </aside>
    )
}