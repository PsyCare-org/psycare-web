import { useContext } from 'react'
import { UserContext } from '../contexts/user'

export function useUser() {
    return useContext(UserContext)
}