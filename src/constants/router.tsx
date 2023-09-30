import { createBrowserRouter } from 'react-router-dom'
import SignIn from 'src/app/pages/sign-in'

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
            }
        
        ]
    },
])