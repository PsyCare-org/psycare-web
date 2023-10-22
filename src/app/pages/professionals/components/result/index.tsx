import { Typography } from '@mui/material'
import { Professional } from 'src/types'
import './styles.scss'
import { ProfessionalsResultItem } from './item'
import { AtomEmpty } from 'src/app/components'

type Props = {
    data: Professional[]
}

export const ProfessionalsResult = ({ data }: Props) => {
    return (
        <div id='professionals-result'>
            { data.length === 0 && (
                <AtomEmpty title='Nenhum resultado encontrado'>
                    Revise os filtros e tente novamente, por favor
                </AtomEmpty>
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