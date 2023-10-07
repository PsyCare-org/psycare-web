import { SetStateAction, createContext } from 'react'
import { User } from 'src/types/user'

type UserContextType = {
    user: User | null,
    signIn: (value: User) => void
    signOut: () => void
}

export const UserContext = createContext<UserContextType>({
    user: null,
    signIn: () => {},
    signOut: () => {}
})
