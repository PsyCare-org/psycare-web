import { Avatar, Card, CardContent, Rating, Typography } from '@mui/material'
import { Professional } from 'src/types'
import { crpStateMap, languageLabels } from 'src/constants'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

type Props = {
    item: Professional
}

export const ProfessionalsResultItem = ({ item }: Props) => {

    const navigate = useNavigate()

    const state: string = crpStateMap[item.crp.split('/')[0]]
    const languages = item.languages.map(el => languageLabels[el]).join(', ')

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
                <div id='header'>
                    <Avatar src={item.avatar} />
                    <div id='text'>
                        <Typography variant='h5'>
                            {item.name} {item.surname}
                        </Typography>

                        <Typography variant='body2' color='text.secondary'>
                            {item.type}
                        </Typography>

                        <Typography id='crp' variant='body2' color='text.secondary'>
                            <span>CRP:</span> {item.crp} | {state}
                        </Typography>

                        <Typography variant='body2' color='text.secondary'>
                            Idioma(s): {languages}
                        </Typography>

                        <div id='rating'>
                            <Rating readOnly value={item.rating} />
                            <Typography variant='body2' color='text.disabled'>
                                {item.ratingCount !== null && item.ratingCount !== undefined
                                    ? `(${item.ratingCount} avaliações)`
                                    : 'Nenhuma avaliação'
                                }
                            </Typography>
                        </div>
                    </div>
                </div>

                <div id='body'>
                    <Typography variant='subtitle1' color='text.secondary'>
                        {item.abstract}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}