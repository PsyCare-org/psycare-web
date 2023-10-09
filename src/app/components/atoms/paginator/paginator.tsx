import { TablePagination } from '@mui/material'
import { ChangeEvent } from 'react'

type Props = {
    total: number
    page: number
    setPage: (val: number) => void
    rowsPerPage: number
    setRowsPerPage: (val: number) => void
    entityName?: string
    options?: number[]
}

export const AtomPaginator = ({
    total,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    entityName = 'Itens',
    options = [10, 15, 20]
}: Props) => {

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (evt: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(evt.target.value))
        setPage(0)
    }

    return (
        <TablePagination
            component='div'
            count={total}
            page={page}
            onPageChange={(_, val) => handlePageChange(val)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={options}
            labelDisplayedRows={({from, to, count}) => `${from}-${to} de ${count}`}
            labelRowsPerPage={`${entityName} por página`}
        />
    )
}