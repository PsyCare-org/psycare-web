import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProfileDataUserForm } from './types/profile-data-user'
import { profileDataUserFormSchema } from './schemas/profile-data-user-form-schema'
import { useEffect, useState } from 'react'
import { FullUser } from './types/full-user'
import { useApi, useSnackbar, usePerson } from 'src/app/hooks'
import { AtomButton, AtomDateField, AtomSelectField, AtomTextField } from 'src/app/components'
import ReactInputMask from 'react-input-mask'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import { CircularProgress, InputAdornment, TextField } from '@mui/material'
import { genderOptions } from 'src/constants'
import dayjs, { Dayjs } from 'dayjs'
import './styles.scss'

export const ProfileDataUser = () => {

    const { get, patch } = useApi()
    const { createSnack } = useSnackbar()
    const { person, updateName } = usePerson()

    const [fullUser, setFullUser] = useState<FullUser | null>(null)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors: formErrors, isValid: formIsValid }
    } = useForm<ProfileDataUserForm>({
        resolver: yupResolver(profileDataUserFormSchema),
        reValidateMode: 'onChange',
        mode: 'onChange'
    })

    const submitHandler = (value: ProfileDataUserForm) => {
        const payload = {
            ...value,
            birthDate: (value.birthDate as Dayjs).toDate().toISOString()
        }

        patch(`/user/${person?.id}`, payload).then((res: FullUser) => {
            updateFormValue(res)
            updateName(res.name)
            createSnack('Dados atualizados com sucesso!', 'success')
        })
    }

    const updateFormValue = (value: FullUser) => {
        setValue('gender', value.gender)
        setValue('name', value.name)
        setValue('surname', value.surname)
        setValue('phoneNumber', value.phoneNumber)
        setValue('birthDate', dayjs(value.birthDate))
    }

    useEffect(() => {
        get(`/user/${person?.id}`).then((res: FullUser) => {
            setFullUser(res)
            updateFormValue(res)
        })
    }, [])

    return fullUser
        ? (
            <form
                id='profile-data-user'
                onSubmit={handleSubmit(submitHandler)}
            >
                <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            required
                            id='name'
                            type='text'
                            label='Nome'
                            autoFocus
                            error={!!formErrors.name}
                            helperText={formErrors.name?.message}
                        />
                    )}
                />

                <Controller
                    name='surname'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            {...field}
                            id='surname'
                            type='text'
                            label='Sobrenome'
                            error={!!formErrors.surname}
                            helperText={formErrors.surname?.message}
                        />
                    )}
                />

                <AtomTextField
                    required
                    disabled
                    id='email'
                    type='text'
                    label='E-mail'
                    value={fullUser?.email}
                    startAdornment={<EmailIcon />}
                />

                <Controller
                    name='phoneNumber'
                    control={control}
                    render={({ field }) => (
                        <ReactInputMask
                            mask='(99) 99999-9999'
                            {...field}
                        >
                            <TextField
                                id='phoneNumber'
                                label='Celular'
                                error={!!formErrors.phoneNumber}
                                helperText={formErrors.phoneNumber?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <PhoneIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </ReactInputMask>
                    )}
                />

                <Controller
                    name='gender'
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                        <AtomSelectField
                            required
                            {...field}
                            inputRef={ref}
                            id='gender'
                            label='Gênero'
                            error={!!formErrors.gender}
                            helperText={formErrors.gender?.message}
                            options={genderOptions}
                        />
                    )}
                />

                <Controller
                    name='birthDate'
                    control={control}
                    render={({ field }) => (
                        <AtomDateField
                            required
                            {...field}
                            label='Data de Nascimento'
                            error={!!formErrors.birthDate}
                            helperText={formErrors.birthDate?.message}
                            disableFuture
                            disableTyping
                        />
                    )}
                />

                <div>
                    <AtomButton 
                        type='submit' 
                        variant='contained'
                        disabled={!formIsValid}
                    >
                        Atualizar
                    </AtomButton>
                </div>
            </form>
        )
        : (
            <CircularProgress color='secondary' size='100px'/>
        )
}