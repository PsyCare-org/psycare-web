import { useEffect, useState } from 'react'
import { useUser } from 'src/app/hooks'
import { Page, professionalPages, userPages } from './utils/pages'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './header-pages.scss'

export const HeaderPages = () => {

    const navigate = useNavigate()

    const { user } = useUser()
    const [pages, setPages] = useState<Page[]>([])

    useEffect(() => {
        if(user?.type === 'user')
            setPages(userPages)
        else
            setPages(professionalPages)
    }, [user])

    return (
        <div id='header-pages'>
            {pages && pages.map(page => (
                <Button
                    key={page.url}
                    variant='text'
                    onClick={() => navigate(page.url)}
                >
                    {page.name}
                </Button>
            ))}
        </div>
    )
}