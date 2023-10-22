import { Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { useApi, usePerson, useSnackbar } from 'src/app/hooks'
import { FollowUp } from 'src/types'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckIcon from '@mui/icons-material/Check'
import { FollowUpType } from 'src/enums'
import { AtomModal } from '../../atoms/modal/modal'
import { FollowUpForm, AtomFollowUpForm } from '../../atoms/follow-up-form/follow-up-form'
import './follow-up.scss'

type Props = {
    data: FollowUp
    allowEdit: boolean
    reload?: () => void
}

export const MolFollowUp = ({
    data,
    allowEdit,
    reload
}: Props) => {

    const { person } = usePerson()
    const { patch, del } = useApi()
    const { createSnack } = useSnackbar()

    const [modalEdit, setModalEdit] = useState<boolean>(false)
    const [modalDelete, setModalDelete] = useState<boolean>(false)

    const onEditSubmit = (value: FollowUpForm) => {
        const payload = {
            id: data.id,
            attendanceId: data.attendanceId,
            check: data.check,
            ...value
        }

        patch(`/follow-up/${data.id}`, payload).then(() => {
            createSnack('Afazer editado com sucesso!', 'success')
            if (reload) reload()
        })
    }

    const onDeleteSubmit = () => {
        del(`/follow-up/${data.id}`).then(() => {
            createSnack('Afazer excluído com sucesso!', 'success')
            if (reload) reload()
        })
    }

    const onConclude = () => {
        const payload = {
            ...data,
            check: true,
        }

        patch(`/follow-up/${data.id}`, payload).then(() => {
            createSnack('Afazer concluído com sucesso!', 'success')
            if (reload) reload()
        })
    }

    return (
        <div id='mol-follow-up'>
            <div id='content'>
                <div id='title' className='item'>
                    <Typography variant='subtitle1'>
                        Título
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {data.title}
                    </Typography>
                </div>

                <div id='type' className='item'>
                    <Typography variant='subtitle1'>
                        Tipo
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {data.type}
                    </Typography>
                </div>

                {data.type === FollowUpType.normal && (
                    <div id='status' className='item'>
                        <Typography variant='subtitle1'>
                            Status
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {data.check ? 'Concluído' : 'Em andamento'}
                        </Typography>
                    </div>
                )}

                <div id='description' className='item'>
                    <Typography variant='subtitle1'>
                        Descrição
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {data.description || '...'}
                    </Typography>
                </div>
            </div>

            {allowEdit && person?.type === 'professional' && (
                <div id='actions'>
                    <IconButton onClick={() => setModalEdit(true)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => setModalDelete(true)}>
                        <DeleteOutlineIcon />
                    </IconButton>
                </div>
            )}

            {allowEdit && person?.type === 'user' && data.type === FollowUpType.normal && !data.check && (
                <div id='actions'>
                    <Tooltip title='Concluir afazer'>
                        <IconButton onClick={onConclude}>
                            <CheckIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )}

            <AtomFollowUpForm
                title='Editar Afazer'
                confirmBtnLabel='Editar'
                modal={modalEdit}
                setModal={setModalEdit}
                onSubmit={onEditSubmit}
                data={data}
            />

            <AtomModal
                value={modalDelete}
                setValue={setModalDelete}
                title='Excluir afazer?'
                confirmBtnLabel='Excluir'
                confirmBtnColor='error'
                confirmBtnVariant='contained'
                confirmBtnClick={onDeleteSubmit}
            >
                <Typography variant='body1'>
                    Por favor, esteja ciente de que esta ação é irreversível e o afazer não poderá ser recuperado após a exclusão. Certifique-se de que deseja prosseguir antes de tomar a decisão final.
                </Typography>
            </AtomModal>
        </div>
    )
}