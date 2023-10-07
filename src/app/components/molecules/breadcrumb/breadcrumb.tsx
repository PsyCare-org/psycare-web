import { Breadcrumbs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useNavigate } from 'react-router-dom'
import './breadcrumb.scss'

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

    return (
        <Breadcrumbs 
            id='mol-breadcrumb'
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            { items && items.map((item, index) => (
                <Typography 
                    key={item.url}
                    onClick={() => item.active && navigate(item.url)}
                    color={index === items.length - 1 ? 'primary' : 'text.secondary'}
                    className={item.active ? 'active' : 'disabled'}
                >
                    { item.label }
                </Typography>
            ))}
        </Breadcrumbs>
    )
}