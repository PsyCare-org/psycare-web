import { Avatar, Typography } from '@mui/material'
import { crpStateMap, languageLabels } from 'src/constants'
import { Professional } from 'src/types'
import './professional-header.scss'
import { ProfessionalHeaderSize } from './types/size'
import { ProfessionalHeaderTypography } from './types/typography'
import { AtomRating } from '../../atoms/rating/rating'

type Props = {
    size?: ProfessionalHeaderSize
    showLangAndRating?: boolean
    professional: Professional
}

export const MolProfessionalHeader = ({
    size = 'normal',
    showLangAndRating = true,
    professional
}: Props) => {

    const state: string = crpStateMap[professional.crp.split('/')[0]]
    const languages = professional.languages.map(el => languageLabels[el]).join(', ')

    const typography: ProfessionalHeaderTypography = {
        small: {
            title: 'h6',
            text: 'body2'
        },
        normal: {
            title: 'h5',
            text: 'body2'
        },
        large: {
            title: 'h4',
            text: 'body1'
        },
    }

    return (
        <div id='mol-professional-header'>
            <Avatar 
                src={professional.avatar}
                className={`${size}-size`}
            />

            <div id='text'>
                <Typography variant={typography[size].title}>
                    {professional.name} {professional.surname}
                </Typography>

                <Typography variant={typography[size].text} color='text.secondary'>
                    {professional.type}
                </Typography>

                <Typography id='crp' variant={typography[size].text} color='text.secondary'>
                    <span>CRP:</span> {professional.crp} | {state}
                </Typography>

                { showLangAndRating && (
                    <>
                        <Typography variant={typography[size].text} color='text.secondary'>
                            Idioma(s): {languages}
                        </Typography>

                        <div id='rating'>
                            <AtomRating value={professional.rating} />
                            <Typography variant={typography[size].text} color='text.disabled'>
                                {professional.ratingCount !== null && professional.ratingCount !== undefined
                                    ? `(${professional.ratingCount} avaliações)`
                                    : 'Nenhuma avaliação'
                                }
                            </Typography>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}