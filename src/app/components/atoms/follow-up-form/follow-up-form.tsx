import { FollowUp } from 'src/types'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from './schemas/form-schema'
import { AtomTextField } from '../text-field/text-field'
import { AtomSelectField } from '../select-field/select-field'
import { followUpTypesOptions } from 'src/constants'
import { SetStateAction, useEffect } from 'react'
import { AtomModal } from '../modal/modal'
import './follow-up-form.scss'

export type FollowUpForm = Omit<FollowUp, 'id' | 'attendanceId' | 'check'>

type Props = {
    modal: boolean
    setModal: (value: SetStateAction<boolean>) => void
    title: string
    confirmBtnLabel: string
    data?: FollowUp
    onSubmit: (value: FollowUpForm) => void
}

export const AtomFollowUpForm = ({
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
    } = useForm<FollowUpForm>({
        resolver: yupResolver(formSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        ...data && {
            defaultValues: {
                description: data.description,
                title: data.title,
                type: data.type
            }
        }
    })

    const submitHandler = (value: FollowUpForm) => {
        onSubmit(value)
    }

    return (
        <AtomModal
            value={modal}
            setValue={setModal}
            title={title}
            confirmBtnLabel={confirmBtnLabel}
            confirmBtnDisabled={!formIsValid}
            confirmBtnForm='mol-follow-up-form'
            confirmBtnVariant='contained'
            confirmBtnClick={handleSubmit(submitHandler)}
        >
            <form id='atom-follow-up-form'>
                <Controller
                    name='title'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            required
                            id='title'
                            type='text'
                            label='Título'
                            autoFocus
                            error={!!formErrors.title}
                            helperText={formErrors.title?.message}
                        />
                    )}
                />

                <Controller
                    name='type'
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                        <AtomSelectField
                            required
                            {...field}
                            inputRef={ref}
                            id='type'
                            label='Tipo'
                            error={!!formErrors.type}
                            helperText={formErrors.type?.message}
                            options={followUpTypesOptions}
                        />
                    )}
                />

                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            id='description'
                            type='text'
                            label='Descrição'
                            error={!!formErrors.description}
                            helperText={formErrors.description?.message}
                            multiline
                            maxRows={5}
                        />
                    )}
                />
            </form>
        </AtomModal>
    )

}