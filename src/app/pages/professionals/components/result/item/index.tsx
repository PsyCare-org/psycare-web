import { Avatar, Card, CardContent, Rating, Typography } from '@mui/material'
import { Professional } from 'src/types'
import { crpStateMap, languageLabels } from 'src/constants'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
import { MolProfessionalDisplay } from 'src/app/components'

type Props = {
    item: Professional
}

export const ProfessionalsResultItem = ({ item }: Props) => {

    const navigate = useNavigate()

    const redirectHandler = () => {
        navigate(`/professionals/${item.id}`)
    }

    return (
        <Card 
            key={item.id} 
            elevation={3} 
            className='professional-item'
            onClick={redirectHandler}
        >
            <CardContent>
                <MolProfessionalDisplay
                    professional={item}
                    size='normal'
                />

                <div id='body'>
                    <Typography variant='subtitle1' color='text.secondary'>
                        {item.abstract}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}