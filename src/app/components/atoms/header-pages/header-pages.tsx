import { useEffect, useState } from 'react'
import { usePerson } from 'src/app/hooks'
import { Page, professionalPages, userPages } from './utils/pages'
import { Button, List } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import './header-pages.scss'

export const HeaderPages = () => {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { person } = usePerson()
    const [pages, setPages] = useState<Page[]>([])

    useEffect(() => {
        if(person?.type === 'user')
            setPages(userPages)
        else
            setPages(professionalPages)
    }, [person])

    return (
        <div id='header-pages'>
            {pages && pages.map(page => (
                <Button
                    key={page.url}
                    variant='text'
                    className={pathname === page.url ? 'active' : ''}
                    sx={{ color: (theme) => theme.palette.grey[700] }}
                    onClick={() => navigate(page.url)}
                >
                    {page.name}
                </Button>
            ))}
        </div>
    )
}