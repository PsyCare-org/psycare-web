import { Typography } from '@mui/material'
import './styles.scss'
import { usePerson } from 'src/app/hooks'
import { ProfileDataUser } from './user'
import { ProfileDataProfessional } from './professional'

export const ProfileData = () => {

    const { person } = usePerson()

    return (
        <div id='profile-data'>
            <div id='title'>
                <Typography variant='h5'>
                    Dados
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Preencha os campos abaixo com suas informações pessoais.
                    { person?.type === 'professional' && (
                        <>
                            <br />
                            <span>
                                Lembre-se de que, além das informações sensíveis, os demais detalhes serão visíveis em seu perfil público, permitindo que os usuários do PsyCare possam conhecê-lo(a) melhor.
                            </span>
                        </>
                    )}
                </Typography>
            </div>

            { person?.type === 'user' && <ProfileDataUser /> }

            { person?.type === 'professional' && <ProfileDataProfessional /> }
        </div>
    )
}