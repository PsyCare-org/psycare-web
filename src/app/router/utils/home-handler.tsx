import { Navigate } from 'react-router-dom'
import { usePerson } from 'src/app/hooks'

export const HomeHandler = () => {
    const { person } = usePerson()

    if(person?.type === 'user') {
        return <Navigate to='/professionals'/>
    } else {
        return <Navigate to='/Patients'/>
    }
}