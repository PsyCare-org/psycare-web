import { ReactNode, useEffect, useState } from 'react'
import { User } from 'src/types'
import { UserContext } from '../contexts/user'
import { useApi, useFile } from '../hooks'

type Props = {
    children: ReactNode
}

const UserProvider = ({ children }: Props) => {

    const { getFile } = useApi()

    const [user, setUser] = useState<User | null>(null)
    const [avatar, setAvatar] = useState<string | null>(null)

    const signIn = (value: User) => {
        setUser(value)

        getFile(`/avatar/${value?.type}/${value?.id}`)
            .then(res => setAvatar(useFile(res)))
    }

    const signOut = () => {
        setUser(null)
        window.sessionStorage.removeItem('user')
    }

    const updateAvatar = (value: string) => {
        setAvatar(value)
    }

    useEffect(() => {
        const userString = window.sessionStorage.getItem('user')
        if(userString !== null) 
            signIn(JSON.parse(userString))
    }, [])

    useEffect(() => {
        if(user !== null)
            window.sessionStorage.setItem('user', JSON.stringify(user))
    }, [user])

    return (
        <UserContext.Provider 
            value={{ 
                user, 
                avatar,
                updateAvatar,
                signIn, 
                signOut 
            }}
        >
            { children }
        </UserContext.Provider>
    )
}

export { UserProvider }