import { Divider, Typography } from '@mui/material'
import { Professional } from 'src/types'
import './styles.scss'
import { Fragment } from 'react'

type Field = {
    id: keyof Professional
    label: string
}

type Props = {
    professional: Professional
}

export const ProfessionalProfile = ({ professional }: Props) => {

    const fields: Field[] = [
        { id: 'abstract', label: 'Resumo' },
        { id: 'specializations', label: 'Especializações' },
        { id: 'expericences', label: 'Experiência' },
        { id: 'historic', label: 'Formação' },
        { id: 'description', label: 'Descrição Pessoal' },
        { id: 'gender', label: 'Gênero' }
    ]

    return (
        <div id='professional-profile'>
            <Typography id='title' variant='h5'>
                Perfil
            </Typography>

            { fields.map(({ id, label }, index) => (
                <Fragment key={id}>
                    <div key={id} className='field'>
                        <Typography variant='subtitle1' color='primary'>
                            { label }
                        </Typography>
                        <Typography variant='body1'>
                            { professional[id] || '...' }
                        </Typography>
                    </div>

                    { index !== fields.length - 1 && <Divider /> }
                </Fragment>
            )) }
        </div>
    )
}