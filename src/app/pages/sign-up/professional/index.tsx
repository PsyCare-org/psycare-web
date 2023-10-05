import { Controller, useForm } from 'react-hook-form'
import { SignUpForm } from './types/sign-up-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpFormSchema } from './schemas/sign-up-form-schema'
import { ButtonAtom, DateFieldAtom, SelectFieldAtom, TextFieldAtom } from 'src/app/components'
import EmailIcon from '@mui/icons-material/Email'
import PasswordIcon from '@mui/icons-material/Password'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PhoneIcon from '@mui/icons-material/Phone'
import { useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Gender } from 'src/enums/gender'
import InputMask from 'react-input-mask'
import { ProfessionalType } from 'src/enums/professional-type'
import useApi from 'src/app/hooks/useApi'
import './styles.scss'

type Props = {
    submit: (value: string) => void
}

export const SignUpProfessional = ({ submit }: Props) => {

    const { post } = useApi()


    const genderOptions = Object.values(Gender).map(el => ({
        value: el,
        label: el
    }))

    const typeOptions = Object.values(ProfessionalType).map(el => ({
        value: el,
        label: el
    }))

    const languageOptions = [
        { label: 'Português', value: 'pt-br' },
        { label: 'Inglês', value: 'en' },
        { label: 'Espanhol', value: 'es' },
    ]

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
            cpf: '',
            crp: '',
            abstract: '',
            birthDate: '',
            confirmPassword: '',
            email: '',
            gender: undefined,
            languages: ['pt-br'],
            name: '',
            password: '',
            phoneNumber: '',
            surname: '',
            type: undefined
        }
    })

    const submitHandler = (value: SignUpForm) => {
        const { confirmPassword, ...payload } = value

        // post('/professional', payload, false).then(() => submit(value.email))
        post('/professional', payload, false).then(() => console.log('cu'))
    }

    return (
        <form id='sign-up-professional' onSubmit={handleSubmit(submitHandler)}>
            <Controller
                name='name'
                control={control}
                render={({ field }) => (
                    <TextFieldAtom
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
                    <TextFieldAtom
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
                name='cpf'
                control={control}
                render={({ field }) => (
                    <InputMask
                        mask='999.999.999-99'
                        {...field}
                    >
                        <TextField
                            id='cpf'
                            label='CPF'
                            error={!!formErrors.cpf}
                            helperText={formErrors.cpf?.message}
                        />
                    </InputMask>
                )}
            />

            <Controller
                name='crp'
                control={control}
                render={({ field }) => (
                    <InputMask
                        mask='99/99999'
                        {...field}
                    >
                        <TextField
                            id='crp'
                            label='Número CRP'
                            error={!!formErrors.crp}
                            helperText={formErrors.crp?.message}
                        />
                    </InputMask>
                )}
            />

            <Controller
                name='email'
                control={control}
                render={({ field }) => (
                    <TextFieldAtom
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
                    <TextFieldAtom
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
                    <TextFieldAtom
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
                    <InputMask
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
                    </InputMask>
                )}
            />

            <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                    <SelectFieldAtom
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
                    <DateFieldAtom
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

            <Controller
                name='type'
                control={control}
                render={({ field }) => (
                    <SelectFieldAtom
                        required
                        {...field}
                        id='type'
                        label='Especialização'
                        error={!!formErrors.type}
                        helperText={formErrors.type?.message}
                        options={typeOptions}
                    />
                )}
            />

            <Controller
                name='languages'
                control={control}
                render={({ field }) => (
                    <SelectFieldAtom
                        required
                        {...field}
                        id='languages'
                        label='Idiomas de atendimento'
                        error={!!formErrors.languages}
                        helperText={formErrors.languages?.message}
                        multiple
                        options={languageOptions}
                    />
                )}
            />

            <Controller
                name='abstract'
                control={control}
                render={({ field }) => (
                    <TextFieldAtom
                        required
                        {...field}
                        id='abstract'
                        label='Resumo'
                        error={!!formErrors.abstract}
                        helperText={formErrors.abstract
                            ? formErrors.abstract?.message
                            : 'Insira um breve texto que servirá para lhe introduzir os usuários da plataforma'
                        }
                        multiline
                        maxRows={10}
                    />
                )}
            />

            <ButtonAtom
                variant='contained'
                type='submit'
                disabled={!formIsValid}
                intercept='/professional'
            >
                Criar conta
            </ButtonAtom>
        </form>
    )
}