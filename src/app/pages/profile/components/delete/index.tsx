import { Card, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import { AtomButton } from 'src/app/components'
import './styles.scss'
import { useApi, useSnackbar, usePerson } from 'src/app/hooks'
import { useNavigate } from 'react-router-dom'

export const ProfileDelete = () => {

    const navigate = useNavigate()
    const { person, signOut } = usePerson()
    const { del } = useApi()
    const { createSnack } = useSnackbar()

    const deleteAccount = () => {
        del(`/${person?.type}/${person?.id}`).then(() => {
            createSnack('Conta excluída com sucesso! Você será desconectado em instantes...', 'success')
            setTimeout(() => {
                signOut()
                navigate('/auth/sign-in')
                window.location.reload()
            }, 2000)
        })
    }

    return (
        <div id='profile-delete'>
            <div id='title'>
                <WarningIcon />
                <Typography variant='h5'>
                    OPERAÇÃO IRREVERSÍVEL!
                </Typography>
            </div>

            <div id='content'>
                <Typography variant='body1'>
                    Você tem certeza de que deseja prosseguir com esta ação? <span>A exclusão da sua conta é uma operação irreversível e resultará na perda permanente de todos os dados associados à sua conta.</span>
                </Typography>
                <Typography variant='body1'>
                    Por favor, certifique-se de que você fez o backup de qualquer informação importante antes de continuar. Se você ainda deseja proceder com a exclusão, clique no botão abaixo.
                </Typography>
            </div>

            <AtomButton variant='contained' color='error' onClick={deleteAccount}>
                Excluir conta
            </AtomButton>
        </div>
    )
}