import { Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'
import { OrgAuth } from 'src/app/components'
import { PersonTypes } from 'src/types/person-types'
import PersonIcon from '@mui/icons-material/Person'
import PsychologyIcon from '@mui/icons-material/Psychology'
import { SignUpUser } from './user'
import { SignUpProfessional } from './professional'
import { useSnackbar } from 'src/app/hooks/useSnackbar'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

export const SignUp = () => {

    const { createSnack } = useSnackbar()
    const navigate = useNavigate()

    const [type, setType] = useState<PersonTypes | null>(null)

    const submitHandler = (value: string) => {
        createSnack('Conta criada com sucesso!', 'success')
        navigate('/auth/sign-in?email=' + value)
    }

    return (
        <OrgAuth>
            <div id='sign-up-wrap'>
                <div id='head'>
                    <Typography variant='h4'>
                        Que prazer lhe ter aqui!
                    </Typography>
                    <Typography variant='body1'>
                        Preencha seus dados para fazer parte do PsyCare.
                    </Typography>
                </div>

                <div id='type-selector'>
                    <Typography variant='body1'>
                        Quero utilizar a ferramenta como um:
                    </Typography>
                    <ToggleButtonGroup 
                        id='button-group'
                        value={type}
                        exclusive
                        onChange={(_, val) => setType(val)}
                    >
                        <ToggleButton className='person-type-btn' value='user'>
                            <PersonIcon/>
                            Usuário
                        </ToggleButton>
                        <ToggleButton className='person-type-btn' value='professional'>
                            <PsychologyIcon/>
                            Profissional
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                { type === 'user' && (
                    <SignUpUser submit={submitHandler} />
                )}

                { type === 'professional' && (
                    <SignUpProfessional submit={submitHandler} />
                )}

                <div id='bottom'>
                    <Typography variant='body2'>
                        Já possui cadastro no PsyCare?
                    </Typography>
                    <Button variant='text' onClick={() => navigate('/auth/sign-in')}>
                        Entrar
                    </Button>
                </div>
            </div>

        </OrgAuth>
    )
}