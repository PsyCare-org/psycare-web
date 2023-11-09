import { Fragment, useState } from 'react'
import { useApi, usePerson, useSnackbar } from 'src/app/hooks'
import { Meeting } from 'src/types'
import { AtomMeetingForm, MeetingForm } from '../../atoms/meeting-form/meeting-form'
import { Field } from './types/field'
import { Collapse, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { AtomModal } from '../../atoms/modal/modal'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import dayjs from 'dayjs'
import './meeting.scss'

type Props = {
    data: Meeting
    allowEdit: boolean
    reload: () => void
}

export const MolMeeting = ({
    data,
    allowEdit,
    reload
}: Props) => {
    const { person } = usePerson()
    const { patch, del } = useApi()
    const { createSnack } = useSnackbar()

    const [expanded, setExpanded] = useState<boolean>(false)
    const [modalEdit, setModalEdit] = useState<boolean>(false)
    const [modalDelete, setModalDelete] = useState<boolean>(false)

    const fields: Field[] = [
        { id: 'relatory', label: 'Relatório', value: data.relatory },
        { id: 'analisys', label: 'Análise teórica', value: data.analisys || '...' },
        { id: 'observations', label: 'Observações', value: data.observations || '...' },
    ]

    const onEditSubmit = (value: MeetingForm) => {
        const payload = {
            id: data.id,
            attendanceId: data.attendanceId,
            ...value
        }

        patch(`/meeting/${data.id}`, payload).then(() => {
            createSnack('Encontro editado com sucesso!', 'success')
            reload()
            setModalEdit(false)
        })
    }

    const onDeleteSubmit = () => {
        del(`/meeting/${data.id}`).then(() => {
            createSnack('Encontro excluído com sucesso!', 'success')
            reload()
            setModalDelete(false)
        })
    }

    return (
        <>
            <TableRow
                id='mol-meeting-top'
                onClick={() => setExpanded(!expanded)}
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>{dayjs(data.dateTime).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell align='center'>
                    <IconButton>
                        {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow id='mol-meeting-body'>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={expanded}>
                        <div id='content'>
                            {fields.map(field => (
                                <div key={field.id} id={field.id} className='item'>
                                    <Typography variant='subtitle1'>
                                        {field.label}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        {field.value}
                                    </Typography>
                                </div>
                            ))}
                        </div>

                        <div id='actions'>
                            <IconButton onClick={() => setModalEdit(true)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => setModalDelete(true)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </div>
                    </Collapse>
                </TableCell>

                <AtomMeetingForm
                    title='Editar Encontro'
                    confirmBtnLabel='Editar'
                    modal={modalEdit}
                    setModal={setModalEdit}
                    onSubmit={onEditSubmit}
                    data={data}
                />

                <AtomModal
                    value={modalDelete}
                    setValue={setModalDelete}
                    title='Excluir Encontro?'
                    confirmBtnLabel='Excluir'
                    confirmBtnColor='error'
                    confirmBtnVariant='contained'
                    confirmBtnClick={onDeleteSubmit}
                >
                    <Typography variant='body1'>
                        Por favor, esteja ciente de que esta ação é irreversível e o encontro não poderá ser recuperado após a exclusão. Certifique-se de que deseja prosseguir antes de tomar a decisão final.
                    </Typography>
                </AtomModal>
            </TableRow>
        </>
    )
}