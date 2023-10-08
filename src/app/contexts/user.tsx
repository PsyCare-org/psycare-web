import { createContext } from 'react'
import { User } from 'src/types'

type UserContextType = {
    user: User | null,
    avatar: string | null,
    updateAvatar: (value: string) => void
    signIn: (value: User) => void
    signOut: () => void
}

export const UserContext = createContext<UserContextType>({
    user: null,
    avatar: null,
    updateAvatar: () => {},
    signIn: () => {},
    signOut: () => {}
})
