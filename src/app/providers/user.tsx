import { ReactNode, useEffect, useState } from 'react'
import { User } from 'src/types/user'
import { UserContext } from '../contexts/user'
import { useNavigate } from 'react-router-dom'

type Props = {
    children: ReactNode
}

const UserProvider = ({ children }: Props) => {
    
    const navigate = useNavigate()

    const [user, setUser] = useState<User | null>(null)

    const signIn = (value: User) => {
        setUser(value)
        navigate('/home')
    }

    const signOut = () => {
        setUser(null)
        navigate('/auth/sign-in')
        window.location.reload()
    }

    useEffect(() => {
        const userString = window.sessionStorage.getItem('user')
        if(userString !== null) setUser(JSON.parse(userString))
    }, [])

    useEffect(() => {
        if(user !== null)
            window.sessionStorage.setItem('user', JSON.stringify(user))
    }, [user])

    return (
        <UserContext.Provider value={{ user, signIn, signOut }}>
            { children }
        </UserContext.Provider>
    )
}

export { UserProvider }