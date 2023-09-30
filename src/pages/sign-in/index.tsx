import { AuthTemplate, TextFieldAtom } from 'src/components'
import { Button, IconButton, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from './schemas/form-schema'
import { SignInForm } from './types/sign-in-form'
import { useState } from 'react'
import PasswordIcon from '@mui/icons-material/Password'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import './styles.scss'

const SignIn = () => {

    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isValid: formIsValid }
    } = useForm<SignInForm>({
        resolver: yupResolver(formSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const [hidePassword, setHidePassword] = useState<boolean>(true)

    const submitHandler = (value: SignInForm) => {
        console.log(value)
    }

    return (
        <AuthTemplate>
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
                            <TextFieldAtom
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
                            <TextFieldAtom
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

                    <Button 
                        variant='contained'
                        type='submit'
                        disabled={!formIsValid}
                    >
                        Entrar
                    </Button>
                </form>

                <div id='bottom'>
                    <Typography variant='body2'>
                        Ainda não está cadastrado no PsyCare?
                    </Typography>
                    <Button variant='text'>
                        Criar conta
                    </Button>
                </div>
            </div>
        </AuthTemplate>
    )
}

export default SignIn