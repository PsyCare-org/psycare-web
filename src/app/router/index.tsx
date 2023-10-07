import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Attendances, Calendar, Historic, Messages, NotFound, Patients, Professionals, Profile, SignIn, SignUp } from 'src/app/pages'
import { AuthGuard } from './utils/auth-guard'
import { HomeHandler } from './utils/home-handler'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<NotFound />} />

                <Route path='/' element={<Navigate to='/home' />} />

                <Route element={<AuthGuard type='private'/>} >
                    <Route path='/home' element={<HomeHandler />} />

                    <Route path='/professionals' element={<Professionals />} />
                    <Route path='/attendances' element={<Attendances />} />
                    <Route path='/historic' element={<Historic />} />
                    <Route path='/calendar' element={<Calendar />} />
                    <Route path='/patients' element={<Patients />} />
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