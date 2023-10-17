import { Navigate, Outlet } from 'react-router-dom'
import { usePerson } from 'src/app/hooks'

type Props = {
    type: 'private' | 'public'
}

export const AuthGuard = ({ type }: Props) => {
    const { person } = usePerson()

    if(type === 'private') {
        return (
            person?.accessToken
                ? <Outlet />
                : <Navigate to='/auth/sign-in' />
        )
    } else {
        return (
            person?.accessToken
                ? <Navigate to='/home' />
                : <Outlet />
        )
    }

    
}