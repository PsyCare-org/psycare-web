import { createContext } from 'react'
import { Person } from 'src/types'

type PersonContextType = {
    person: Person | null,
    avatar: string | null,
    updateName: (value: string) => void
    updateAvatar: (value: string) => void
    signIn: (value: Person) => void
    signOut: () => void
}

export const PersonContext = createContext<PersonContextType>({
    person: null,
    avatar: null,
    updateName: () => {},
    updateAvatar: () => {},
    signIn: () => {},
    signOut: () => {}
})
