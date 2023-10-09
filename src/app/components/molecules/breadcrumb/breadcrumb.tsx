import { Breadcrumbs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useNavigate } from 'react-router-dom'
import './breadcrumb.scss'
import { useEffect, useState } from 'react'

export type BreadcrumbItem = {
    url: string
    label: string
    active: boolean
}

type Props = {
    items: BreadcrumbItem[]
}

export const MolBreadcrumb = ({ items }: Props) => {

    const navigate = useNavigate()

    const [isPageScrolled, setIsPageScrolled] = useState<boolean>(false)

    useEffect(() => {
        document.querySelector('#default-template > main')?.addEventListener('scroll', evt => {
            setIsPageScrolled((evt.target as HTMLElement).scrollTop > 0)
        })
    }, [])

    return (
        <Breadcrumbs 
            id='mol-breadcrumb'
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            { ...isPageScrolled && { className: 'page-scrolled' } }
        >
            { items && items.map((item, index) => (
                <Typography 
                    key={item.url}
                    onClick={() => item.active && navigate(item.url)}
                    color={index === items.length - 1 ? 'text.secondary' : 'text.disabled'}
                    className={item.active ? 'active' : 'disabled'}
                >
                    { item.label }
                </Typography>
            ))}
        </Breadcrumbs>
    )
}