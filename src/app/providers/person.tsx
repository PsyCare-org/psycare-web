import { ReactNode, useEffect, useState } from 'react'
import { Person } from 'src/types'
import { useApi } from '../hooks'
import { env } from 'src/constants'
import { AxiosRequestConfig } from 'axios'
import { PersonContext } from '../contexts/person'

type Props = {
    children: ReactNode
}

const PersonProvider = ({ children }: Props) => {

    const { axios } = useApi()

    const [person, setPerson] = useState<Person | null>(null)
    const [avatar, setAvatar] = useState<string | null>(null)

    const signIn = (value: Person) => {
        setPerson(value)

        const url = `${env.dataApiUrl}/avatar/${value.type}/${value.id}`

        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': 'Bearer ' + value.accessToken
            }
        }

        axios.get(url, config).then(res => setAvatar(res.data))
    }

    const signOut = () => {
        setPerson(null)
        window.sessionStorage.removeItem('person')
    }

    const updateAvatar = (value: string) => {
        setAvatar(value)
    }

    const updateName = (name: string) => {
        setPerson(currentPerson => ({
            ...currentPerson,
            name
        } as Person))
    }

    useEffect(() => {
        const personString = window.sessionStorage.getItem('pérson')
        if(personString !== null) 
            signIn(JSON.parse(personString))
    }, [])

    useEffect(() => {
        if(person !== null)
            window.sessionStorage.setItem('person', JSON.stringify(person))
    }, [person])

    return (
        <PersonContext.Provider 
            value={{ 
                person,
                updateName,
                avatar,
                updateAvatar,
                signIn, 
                signOut 
            }}
        >
            { children }
        </PersonContext.Provider>
    )
}

export { PersonProvider }