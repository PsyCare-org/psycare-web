import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, SignIn, SignUp } from 'src/app/pages'
import { AuthGuard } from './utils/auth-guard'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthGuard type='private'/>} >
                    <Route path='/home' element={<Home />} />
                </Route>

                <Route element={<AuthGuard type='public'/>} >
                    <Route path='/auth'>
                        <Route path='sign-in' element={<SignIn/>} />
                        <Route path='sign-up' element={<SignUp/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}