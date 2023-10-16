import { ReactNode, useEffect, useState } from 'react'
import { User } from 'src/types'
import { UserContext } from '../contexts/user'
import { useApi } from '../hooks'
import { env } from 'src/constants'
import { AxiosRequestConfig } from 'axios'

type Props = {
    children: ReactNode
}

const UserProvider = ({ children }: Props) => {

    const { axios } = useApi()

    const [user, setUser] = useState<User | null>(null)
    const [avatar, setAvatar] = useState<string | null>(null)

    const signIn = (value: User) => {
        setUser(value)

        const url = `${env.dataApiUrl}/avatar/${value.type}/${value.id}`

        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': 'Bearer ' + value.accessToken
            }
        }

        axios.get(url, config).then(res => setAvatar(res.data))
    }

    const signOut = () => {
        setUser(null)
        window.sessionStorage.removeItem('user')
    }

    const updateAvatar = (value: string) => {
        setAvatar(value)
    }

    const updateName = (name: string) => {
        setUser(currentUser => ({
            ...currentUser,
            name
        } as User))
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
                updateName,
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