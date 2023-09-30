import { SetStateAction, createContext } from 'react'
import { User } from 'src/types/user'

type UserContextType = {
    user: User | null,
    setUser: (value: SetStateAction<User | null>) => void
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
})
