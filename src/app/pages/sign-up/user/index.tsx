import { Controller, useForm } from 'react-hook-form'
import useApi from 'src/app/hooks/useApi'
import { Gender } from 'src/enums/gender'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { signUpFormSchema } from './schemas/sign-up-form-schema'
import { SignUpForm } from './types/sign-up-form'
import { AtomButton, AtomDateField, AtomSelectField, AtomTextField } from 'src/app/components'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import ReactInputMask from 'react-input-mask'
import EmailIcon from '@mui/icons-material/Email'
import PasswordIcon from '@mui/icons-material/Password'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PhoneIcon from '@mui/icons-material/Phone'
import './styles.scss'

type Props = {
    submit: (value: string) => void
}

export const SignUpUser = ({ submit }: Props) => {
    const { post } = useApi()

    const genderOptions = Object.values(Gender).map(el => ({
        value: el,
        label: el
    }))

    const [hidePassword, setHidePassword] = useState<boolean>(true)

    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isValid: formIsValid }
    } = useForm<SignUpForm>({
        resolver: yupResolver(signUpFormSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            birthDate: '',
            confirmPassword: '',
            email: '',
            gender: undefined,
            name: '',
            password: '',
            phoneNumber: '',
            surname: '',
        }
    })

    const submitHandler = (value: SignUpForm) => {
        const { confirmPassword, ...payload } = value

        post('/user', payload, false).then(() => submit(value.email))
    }

    return (
        <form id='sign-up-user' onSubmit={handleSubmit(submitHandler)}>
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
                        required
                        {...field}
                        id='surname'
                        type='text'
                        label='Sobrenome'
                        error={!!formErrors.surname}
                        helperText={formErrors.surname?.message}
                    />
                )}
            />

            <Controller
                name='email'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        required
                        {...field}
                        id='email'
                        type='text'
                        label='E-mail'
                        error={!!formErrors.email}
                        helperText={formErrors.email?.message}
                        startAdornment={<EmailIcon />}
                    />
                )}
            />

            <Controller
                name='password'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        required
                        {...field}
                        id='password'
                        type={hidePassword ? 'password' : 'text'}
                        label='Senha'
                        error={!!formErrors.password}
                        helperText={formErrors.password?.message}
                        startAdornment={<PasswordIcon />}
                        endAdornment={(
                            <IconButton onClick={() => setHidePassword(!hidePassword)}>
                                {hidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        )}
                    />
                )}
            />

            <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        required
                        {...field}
                        id='confirmPassword'
                        type={hidePassword ? 'password' : 'text'}
                        label='Confirmar senha'
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword?.message}
                        startAdornment={<PasswordIcon />}
                        endAdornment={(
                            <IconButton onClick={() => setHidePassword(!hidePassword)}>
                                {hidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        )}
                    />
                )}
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
                render={({ field }) => (
                    <AtomSelectField
                        required
                        {...field}
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
                        error={!!formErrors.gender}
                        helperText={formErrors.gender?.message}
                        disableFuture
                        disableTyping
                    />
                )}
            />

            <AtomButton
                variant='contained'
                type='submit'
                disabled={!formIsValid}
            >
                Criar conta
            </AtomButton>
        </form>
    )
}