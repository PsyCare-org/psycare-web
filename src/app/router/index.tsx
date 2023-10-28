import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
    Attendance,
    Attendances,
    Calendar,
    Historic,
    Historics,
    Call,
    Messages,
    NotFound,
    Professional,
    Professionals,
    Profile,
    SignIn,
    SignUp
} from 'src/app/pages'
import { AuthGuard } from './utils/auth-guard'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<NotFound />} />

                <Route path='/' element={<Navigate to='/home' />} />

                <Route element={<AuthGuard type='private'/>} >
                    <Route path='/home' element={<Navigate to='/attendances'/>} />

                    <Route path='/professionals' element={<Professionals />} />
                    <Route path='/professionals/:id' element={<Professional />} />
                    <Route path='/attendances' element={<Attendances />} />
                    <Route path='/attendances/:id' element={<Attendance />} />
                    <Route path='/attendances/:id/call' element={<Call />} />
                    <Route path='/historics' element={<Historics />} />
                    <Route path='/historics/:id' element={<Historic />} />
                    <Route path='/calendar' element={<Calendar />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/messages' element={<Messages />} />
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