import { TypographyPropsVariantOverrides } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { OverridableStringUnion } from '@mui/types'
import { ProfessionalHeaderSize } from './size'

export type ProfessionalHeaderTypography = {
    [size in ProfessionalHeaderSize]: {
        title:  OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
        text: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
    }
}