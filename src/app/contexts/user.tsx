import { createContext } from 'react'
import { User } from 'src/types'

type UserContextType = {
    user: User | null,
    avatar: string | null,
    updateName: (value: string) => void
    updateAvatar: (value: string) => void
    signIn: (value: User) => void
    signOut: () => void
}

export const UserContext = createContext<UserContextType>({
    user: null,
    avatar: null,
    updateName: () => {},
    updateAvatar: () => {},
    signIn: () => {},
    signOut: () => {}
})
