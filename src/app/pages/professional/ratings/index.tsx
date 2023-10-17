import { Typography } from '@mui/material'
import { Professional } from 'src/types'
import './styles.scss'
import { AtomRating } from 'src/app/components'

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
                <AtomRating
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
                { professional.ratings && professional.ratings.length > 0 && professional.ratings.map(rating => (
                    <div key={rating.id} className='rating'>
                        <div>
                            <AtomRating value={rating.value} />
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