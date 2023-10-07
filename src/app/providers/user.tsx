import { ReactNode, useEffect, useState } from 'react'
import { User } from 'src/types/user'
import { UserContext } from '../contexts/user'

type Props = {
    children: ReactNode
}

const UserProvider = ({ children }: Props) => {

    const [user, setUser] = useState<User | null>(null)

    const signIn = (value: User) => {
        setUser(value)
        window.sessionStorage.setItem('user', JSON.stringify(user))
    }

    const signOut = () => {
        setUser(null)
        window.sessionStorage.removeItem('user')
    }

    useEffect(() => {
        const userString = window.sessionStorage.getItem('user')
        if(userString !== null) 
            signIn(JSON.parse(userString))
    }, [])

    return (
        <UserContext.Provider value={{ user, signIn, signOut }}>
            { children }
        </UserContext.Provider>
    )
}

export { UserProvider }