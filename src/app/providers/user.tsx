import { ReactNode, useEffect, useState } from 'react'
import { User } from 'src/types/user'
import { UserContext } from '../contexts/user'

type Props = {
    children: ReactNode
}

const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const userString = window.sessionStorage.getItem('user')
        if(userString !== null) setUser(JSON.parse(userString))
    }, [])

    useEffect(() => {
        if(user !== null)
            window.sessionStorage.setItem('user', JSON.stringify(user))
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}

export { UserProvider }