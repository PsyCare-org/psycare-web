import { yupResolver } from '@hookform/resolvers/yup'
import { SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Meeting } from 'src/types'
import { formSchema } from './schemas/form-schema'
import { AtomDateField, AtomModal, AtomTextField } from 'src/app/components'
import './meeting-form.scss'
import dayjs from 'dayjs'

export type MeetingForm = {
    dateTime: any
} & Omit<Meeting, 'id' | 'attendanceId' | 'dateTime'>

type Props = {
    modal: boolean
    setModal: (value: SetStateAction<boolean>) => void
    title: string
    confirmBtnLabel: string
    data?: Meeting
    onSubmit: (value: MeetingForm) => void
}

export const AtomMeetingForm = ({
    modal,
    setModal,
    title,
    confirmBtnLabel,
    data,
    onSubmit
}: Props) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors: formErrors, isValid: formIsValid }
    } = useForm<MeetingForm>({
        resolver: yupResolver(formSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        ...data && {
            defaultValues: {
                analisys: data.analisys,
                dateTime: dayjs(data.dateTime),
                observations: data.observations,
                relatory: data.relatory,
                status: data.status
            }
        }
    })

    const submitHandler = (value: MeetingForm) => {
        onSubmit(value)
    }

    return (
        <AtomModal
            value={modal}
            setValue={setModal}
            title={title}
            confirmBtnLabel={confirmBtnLabel}
            confirmBtnDisabled={!formIsValid}
            className='custom-modal-width'
            confirmBtnForm='atom-meeting-form'
            confirmBtnVariant='contained'
            confirmBtnClick={handleSubmit(submitHandler)}
        >
            <form id='atom-meeting-form'>
                <Controller
                    name='dateTime'
                    control={control}
                    render={({ field }) => (
                        <AtomDateField
                            required
                            {...field}
                            id='dateTime'
                            label='Data do encontro'
                            error={!!formErrors.dateTime}
                            helperText={formErrors.dateTime?.message}
                            disableFuture
                            disableTyping
                        />
                    )}
                />

                <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            required
                            id='status'
                            type='text'
                            label='Status'
                            error={!!formErrors.status}
                            helperText={formErrors.status?.message}
                        />
                    )}
                />

                <Controller
                    name='relatory'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            required
                            id='relatory'
                            type='text'
                            label='Relatório'
                            error={!!formErrors.relatory}
                            helperText={formErrors.relatory?.message}
                            multiline
                            maxRows={10}
                        />
                    )}
                />

                <Controller
                    name='analisys'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            id='analisys'
                            type='text'
                            label='Análise teórica'
                            error={!!formErrors.analisys}
                            helperText='Análise teórica da sessão baseada na abordagem sobre a qual você atua'
                            multiline
                            maxRows={10}
                        />
                    )}
                />

                <Controller
                    name='observations'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            id='observations'
                            type='text'
                            label='Observações'
                            error={!!formErrors.observations}
                            helperText='Observações gerais sobre a sessão'
                            multiline
                            maxRows={10}
                        />
                    )}
                />
            </form>
        </AtomModal>
    )
}