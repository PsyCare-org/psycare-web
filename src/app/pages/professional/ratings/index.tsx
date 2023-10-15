import { Rating, Typography } from '@mui/material'
import { Professional } from 'src/types'
import { TEMPORARY_RATINGS } from './temp/ratings'
import './styles.scss'

type Props = {
    professional: Professional
}

export const ProfessionalRatings = ({ professional }: Props) => {
    return (
        <div id='professional-ratings'>
            <Typography variant='h5'>
                Avaliações
            </Typography>

            <div id='total'>
                <Rating
                    readOnly
                    size='medium'
                    value={professional.rating}
                />
                <Typography variant='body1' color='primary'>
                    {professional.ratingCount !== null && professional.ratingCount !== undefined
                        ? `${professional.ratingCount} avaliações`
                        : 'Nenhuma avaliação'
                    }
                </Typography>
            </div>

            <div id='content'>
                { TEMPORARY_RATINGS.map(rating => (
                    <div key={rating.id} className='rating'>
                        <div>
                            <Rating
                                readOnly
                                size='small'
                                value={rating.value}
                            />
                            <Typography variant='body2' color='text.secondary'>
                                { new Date(rating.createdAt).toLocaleDateString() }
                            </Typography>
                            <Typography variant='body1'>
                                { rating.description }
                            </Typography>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}