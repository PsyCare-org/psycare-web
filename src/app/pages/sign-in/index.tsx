import { OrgAuth, AtomButton, AtomTextField } from 'src/app/components'
import { IconButton, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from './schemas/form-schema'
import { SignInForm } from './types/sign-in-form'
import { useState } from 'react'
import PasswordIcon from '@mui/icons-material/Password'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import useApi from 'src/app/hooks/useApi'
import { useUser } from 'src/app/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'src/app/hooks/useQuery'
import './styles.scss'

export const SignIn = () => {

    const { post } = useApi()
    const { signIn } = useUser()
    const navigate = useNavigate()
    const query = useQuery()

    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isValid: formIsValid }
    } = useForm<SignInForm>({
        resolver: yupResolver(formSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            email: query.get('email') || '',
            password: ''
        }
    })

    const [hidePassword, setHidePassword] = useState<boolean>(true)

    const submitHandler = (value: SignInForm) => {
        post('/auth/sign-in', value, false).then(res => {
            signIn(res)
        })
    }

    return (
        <OrgAuth>
            <div id='sign-in-wrap'>
                <div id='head'>
                    <Typography variant='h4'>
                        Bem vinde de volta!
                    </Typography>
                    <Typography variant='body1'>
                        Autentique-se para voltar a utilizar a ferramenta.
                    </Typography>
                </div>

                <form onSubmit={handleSubmit(submitHandler)}>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field }) => (
                            <AtomTextField
                                {...field}
                                id='email'
                                type='text'
                                label='E-mail'
                                autoFocus
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

                    <AtomButton 
                        variant='contained'
                        type='submit'
                        disabled={!formIsValid}
                    >
                        Entrar
                    </AtomButton>
                </form>

                <div id='bottom'>
                    <Typography variant='body2'>
                        Ainda não está cadastrado no PsyCare?
                    </Typography>
                    <AtomButton variant='text' onClick={() => navigate('/auth/sign-up')}>
                        Criar conta
                    </AtomButton>
                </div>
            </div>
        </OrgAuth>
    )
}