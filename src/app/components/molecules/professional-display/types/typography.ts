import { TypographyPropsVariantOverrides } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { OverridableStringUnion } from '@mui/types'
import { ProfessionalDisplaySize } from './size'

export type ProfessionalDisplayTypography = {
    [size in ProfessionalDisplaySize]: {
        title:  OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
        text: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
    }
}