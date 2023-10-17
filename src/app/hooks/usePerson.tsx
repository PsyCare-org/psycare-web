import { useContext } from 'react'
import { PersonContext } from '../contexts/person'

export function usePerson() {
    return useContext(PersonContext)
}