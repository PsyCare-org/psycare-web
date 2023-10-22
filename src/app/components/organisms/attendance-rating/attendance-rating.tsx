import { Rating as MuiRating, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Attendance } from 'src/types'
import { Rating } from './types/rating'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from './schemas/form-schema'
import { AtomTextField } from '../../atoms/text-field/text-field'
import { AtomButton } from '../../atoms/button/button'
import { useApi, useSnackbar } from 'src/app/hooks'
import './attendance-rating.scss'

type Props = {
    data: Attendance
    reload: () => void
}

export const MolAttendanceRating = ({ data, reload }: Props) => {

    const { patch, post, del } = useApi()
    const { createSnack } = useSnackbar()

    const mode = data.rating ? 'edit' : 'create'

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors: formErrors, isValid: formIsValid }
    } = useForm<Rating>({
        resolver: yupResolver(formSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        ...mode && {
            defaultValues: {
                value: data.rating?.value,
                description: data.rating?.description
            }
        }
    })

    const submitHandler = (value: Rating) => {
        const payload = {
            ...mode === 'create' && { attendanceId: data.id },
            ...value
        }

        if(mode === 'create') {
            post('/rating', payload).then(() => {
                createSnack('Atendimento avaliado com sucesso!', 'success')
                reload()
            })
        } else {
            patch(`/rating/${data.rating?.id}`, payload).then(() => {
                createSnack('Atendimento atualizado com sucesso!', 'success')
                reload()
            })
        }
    }

    const deleteHandler = () => {
        del(`/rating/${data.rating?.id}`).then(() => {
            createSnack('Atendimento excluído com sucesso!', 'success')
            reset()
            reload()
        })
    }

    return (
        <div id='mol-attendance-rating'>
            <div id='title'>
                <Typography variant='h5'>
                    Avaliar atendimento
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Compartilhe sua experiência avaliando o atendimento recebido do profissional. Sua avaliação é valiosa para a melhoria contínua do serviço e para ajudar outros usuários a encontrar profissionais de confiança.
                </Typography>
            </div>

            <form onSubmit={handleSubmit(submitHandler)}>
                <Controller
                    name='value'
                    control={control}
                    render={({ field }) => (
                        <div id='rating'>
                            <Typography id='label' variant='caption'>
                                Valor <span id='required'>*</span>
                            </Typography>
                            <div id='input'>
                                <MuiRating
                                    {...field}
                                    precision={0.5}
                                    size='large'
                                />
                                <Typography id='value' variant='caption'>
                                    ({ field.value || '...' })
                                </Typography>
                            </div>
                        </div>
                    )}
                />

                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            id='description'
                            label='Descrição'
                            error={!!formErrors.description}
                            helperText={formErrors.description?.message}
                            multiline
                            maxRows={5}
                        />
                    )}
                />

                <div id='buttons'>
                    <AtomButton
                        type='submit'
                        disabled={!formIsValid}
                        variant='contained'
                    >
                        { mode === 'create' ? 'Avaliar' : 'Editar avaliação' }
                    </AtomButton>

                    { mode === 'edit' && (
                        <AtomButton
                            type='button'
                            variant='outlined'
                            color='error'
                            onClick={deleteHandler}
                        >
                            Excluir avaliação
                        </AtomButton>
                    )}
                </div>
            </form>
        </div>
    )
}