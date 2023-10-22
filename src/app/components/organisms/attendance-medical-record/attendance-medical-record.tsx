import { yupResolver } from '@hookform/resolvers/yup'
import { Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Attendance } from 'src/types'
import { MedicalRecord } from './types/medical-record'
import { formSchema } from './schemas/form-schema'
import { AtomTextField } from '../../atoms/text-field/text-field'
import { AtomButton } from '../../atoms/button/button'
import { useApi, useSnackbar } from 'src/app/hooks'
import './attendance-medical-record.scss'

type Props = {
    data: Attendance
    isActive: boolean
    patientName: string
    reload: () => void
}

export const MolAttendanceMedicalRecord = ({
    data,
    isActive,
    patientName,
    reload
}: Props) => {

    const mode = data.medicalRecord ? 'edit' : 'create'
    const { id, attendanceId, ...currentMedicalRecord } = data.medicalRecord || {}

    const { post, patch } = useApi()
    const { createSnack } = useSnackbar()

    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isValid: formIsValid }
    } = useForm<MedicalRecord>({
        resolver: yupResolver(formSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        ...mode && {
            defaultValues: {
                ...currentMedicalRecord
            }
        }
    })

    const onCreate = (value: MedicalRecord) => {
        const payload = {
            attendanceId: data.id,
            ...value
        }

        post('/medical-record', payload).then(() => {
            createSnack('Prontuário criado com sucesso!', 'success')
            reload()
        })
    }
    
    const onEdit = (value: MedicalRecord) => {
        const payload = {
            id,
            attendanceId,
            ...value
        }

        patch(`/medical-record/${id}`, payload).then(() => {
            createSnack('Prontuário atualizado com sucesso!', 'success')
            reload()
        })
    }

    return (
        <div id='mol-attendance-medical-record'>
            <div id='title'>
                <Typography variant='h5'>
                    Prontuário Médico
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Este é o prontuário médico do paciente {patientName}, disponível exclusivamente para você.
                    Lembre-se de que o acesso a esta seção é exclusivo para você e visa a melhor prestação de cuidados da saúde mental do paciente em questão.
                </Typography>
            </div>

            <form 
                { ...mode === 'create' && { onSubmit: handleSubmit(onCreate) }}
                { ...mode === 'edit' && { onSubmit: handleSubmit(onEdit) }}
            >
                <Controller
                    name='initialDemand'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            { ...!isActive && { disabled: true } }
                            required
                            id='initialDemand'
                            label='Demanda inicial'
                            error={!!formErrors.initialDemand}
                            helperText={formErrors.initialDemand?.message}
                            multiline
                            maxRows={5}
                        />
                    )}
                />

                <Controller
                    name='pastHistory'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            { ...!isActive && { disabled: true } }
                            id='pastHistory'
                            label='História regressa'
                            error={!!formErrors.pastHistory}
                            helperText={formErrors.pastHistory?.message}
                            multiline
                            maxRows={5}
                        />
                    )}
                />

                <Controller
                    name='intervationPlan'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            { ...!isActive && { disabled: true } }
                            id='intervationPlan'
                            label='Plano de intervenção'
                            error={!!formErrors.intervationPlan}
                            helperText={formErrors.intervationPlan?.message}
                            multiline
                            maxRows={5}
                        />
                    )}
                />

                <Controller
                    name='evolutions'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            { ...!isActive && { disabled: true } }
                            id='evolutions'
                            label='Evoluções'
                            error={!!formErrors.evolutions}
                            helperText={formErrors.evolutions?.message}
                            multiline
                            maxRows={5}
                        />
                    )}
                />

                { isActive && (
                    <div id='buttons'>
                        <AtomButton
                            type='submit'
                            disabled={!formIsValid}
                            variant='contained'
                        >
                            { mode === 'create' ? 'Criar prontuário' : 'Editar prontuário' }
                        </AtomButton>
                    </div>
                )}
            </form>
        </div>
    )
}