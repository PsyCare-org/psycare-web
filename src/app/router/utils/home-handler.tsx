import { Navigate } from 'react-router-dom'
import { useUser } from 'src/app/hooks'

export const HomeHandler = () => {
    const { user } = useUser()

    if(user?.type === 'user') {
        return <Navigate to='/professionals'/>
    } else {
        return <Navigate to='/Patients'/>
    }
}