import { useEffect, useState } from 'react'
import { AtomPaginator, BreadcrumbItem, OrgDefault } from 'src/app/components'
import { Filter } from './components/filter/types/filter'
import { useApi } from 'src/app/hooks'
import { Professional } from 'src/types'
import { Typography } from '@mui/material'
import { ProfessionalsFilter } from './components/filter'
import { ProfessionalsResult } from './components/result'
import './styles.scss'

const breadcrumbs: BreadcrumbItem[] = [
    {
        active: false,
        label: 'Profissionals',
        url: '/professionals'
    }
]

export const Professionals = () => {

    const { get } = useApi()

    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [filter, setFilter] = useState<Filter>({})
    const [data, setData] = useState<Professional[]>([])

    const loadData = () => {
        const payload: any = {
            ...filter,
            page,
            rowsPerPage
        }

        const params = new URLSearchParams(payload).toString()

        get(`/professional?${params}`).then((res: any) => {
            setTotal(res.total)
            setData(res.data)
        })
    }

    useEffect(() => {
        loadData()
    }, [page, rowsPerPage, filter])

    return (
        <OrgDefault breadcrumbs={breadcrumbs}>
            <div id='professionals'>
                <div id='title'>
                    <Typography variant='h4'>
                        Profissionais
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Encontre o profissional que melhor atenda às suas necessidades usando os filtros disponíveis abaixo.
                    </Typography>
                </div>

                <ProfessionalsFilter onChange={setFilter} />

                <ProfessionalsResult data={data} />

                <AtomPaginator
                    total={total}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    entityName='Profissionais'
                    options={[10, 20]}
                />
            </div>
        </OrgDefault>
    )
}