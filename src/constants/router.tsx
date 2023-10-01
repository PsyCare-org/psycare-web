import { createBrowserRouter } from 'react-router-dom'
import { SignIn, SignUp } from 'src/app/pages'

export const router = createBrowserRouter([
    {
        path: '/*',
        element: <>to no 404</>
    },
    {
        path: '/auth',
        children: [
            {
                path: 'sign-in',
                element: <SignIn />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            }
        ]
    },
])