import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from 'src/app/hooks'

type Props = {
    type: 'private' | 'public'
}

export const AuthGuard = ({ type }: Props) => {
    const { user } = useUser()

    if(type === 'private') {
        return (
            user?.accessToken
                ? <Outlet />
                : <Navigate to='/auth/sign-in'/>
        )
    } else {
        return (
            user?.accessToken
                ? <Navigate to='/home'/>
                : <Outlet />
        )
    }

    
}