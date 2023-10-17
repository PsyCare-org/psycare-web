import { IconButton, Typography } from '@mui/material'
import { ProfilePasswordForm } from './types/profile-password-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { profilePasswordFormSchema } from './schemas/profile-password-schema'
import { Controller, useForm } from 'react-hook-form'
import { AtomButton, AtomTextField } from 'src/app/components'
import PasswordIcon from '@mui/icons-material/Password'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import './styles.scss'
import { useApi, useSnackbar, usePerson } from 'src/app/hooks'
import { useNavigate } from 'react-router-dom'

export const ProfilePassword = () => {

    const navigate = useNavigate()
    const { person, signOut } = usePerson()
    const { patch } = useApi()
    const { createSnack } = useSnackbar()

    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [hideCurPassword, setHideCurPassword] = useState<boolean>(true)

    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isValid: formIsValid }
    } = useForm<ProfilePasswordForm>({
        resolver: yupResolver(profilePasswordFormSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            currentPassword: '',
            newConfirmPassword: '',
            newPassword: ''
        }
    })

    const submitHandler = ({ newConfirmPassword, ...payload }: ProfilePasswordForm) => {
        patch(`/${person?.type}/change-password/${person?.id}`, payload).then(() => {
            createSnack('Senha alterada com sucesso! Você será desconectado em instantes...', 'success')
            setTimeout(() => {
                signOut()
                navigate('/auth/sign-in')
                window.location.reload()
            }, 2000)
        })
    }

    return (
        <div id='profile-password'>
            <div id='title'>
                <Typography variant='h5'>
                    Alterar senha
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Para prosseguir preencha os campos abaixo.
                </Typography>
            </div>

            <form onSubmit={handleSubmit(submitHandler)}>
                <Controller
                    name='currentPassword'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            required
                            {...field}
                            id='currentPassword'
                            type={hideCurPassword ? 'password' : 'text'}
                            label='Senha atual'
                            error={!!formErrors.currentPassword}
                            helperText={formErrors.currentPassword?.message}
                            startAdornment={<PasswordIcon />}
                            endAdornment={(
                                <IconButton onClick={() => setHideCurPassword(!hideCurPassword)}>
                                    {hideCurPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            )}
                        />
                    )}
                />

                <Controller
                    name='newPassword'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            required
                            {...field}
                            id='newPassword'
                            type={hidePassword ? 'password' : 'text'}
                            label='Nova senha'
                            error={!!formErrors.newPassword}
                            helperText={formErrors.newPassword?.message}
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
                    name='newConfirmPassword'
                    control={control}
                    render={({ field }) => (
                        <AtomTextField
                            required
                            {...field}
                            id='newConfirmPassword'
                            type={hidePassword ? 'password' : 'text'}
                            label='Confirmar nova senha'
                            error={!!formErrors.newConfirmPassword}
                            helperText={formErrors.newConfirmPassword?.message}
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
                    Alterar
                </AtomButton>
            </form>
        </div>
    )
}