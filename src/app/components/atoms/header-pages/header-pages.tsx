import { useEffect, useState } from 'react'
import { usePerson } from 'src/app/hooks'
import { Button } from '@mui/material'
import { Page } from './types/page'
import { useLocation, useNavigate } from 'react-router-dom'
import './header-pages.scss'

export const HeaderPages = () => {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { person } = usePerson()
    const [pages, setPages] = useState<Page[]>([])

    useEffect(() => {
        const newPages: Page[] = [
            { name: 'Acompanhamentos', url: '/attendances'},
            { name: 'Histórico', url: '/historic'},
            { name: 'Agenda', url: '/calendar'},
        ]

        if(person?.type === 'user')
            newPages.unshift({ name: 'Profissionais', url: '/professionals'})

        setPages(newPages)
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