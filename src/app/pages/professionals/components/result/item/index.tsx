import { Avatar, Card, CardActionArea, CardContent, Rating, Typography } from '@mui/material'
import { Professional } from 'src/types'
import { crpStateMap, languageLabels } from 'src/constants'
import './styles.scss'
import { useRef } from 'react'
import TouchRipple from '@mui/material/ButtonBase/TouchRipple'

type Props = {
    item: Professional
}

export const ProfessionalsResultItem = ({ item }: Props) => {

    const state: string = crpStateMap[item.crp.split('/')[0]]
    const languages = item.languages.map(el => languageLabels[el]).join(', ')

    return (
        <Card key={item.id} elevation={3} className='professional-item'>
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