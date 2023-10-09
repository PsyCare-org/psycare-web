import { Typography } from '@mui/material'
import { Professional } from 'src/types'
import './styles.scss'
import { ProfessionalsResultItem } from './item'

type Props = {
    data: Professional[]
}

export const ProfessionalsResult = ({ data }: Props) => {
    return (
        <div id='professionals-result'>
            { data.length === 0 && (
                <div id='empty'>
                    <Typography variant='h5' color='primary'>
                        Nenhum resultado encontrado
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Revise os filtros e tente novamente, por favor
                    </Typography>
                </div>
            )}

            { data.length > 0 && data.map(item => (
                <ProfessionalsResultItem
                    key={item.id}
                    item={item}
                />
            )) }
        </div>
    )
}