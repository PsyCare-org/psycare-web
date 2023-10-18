import { TypographyPropsVariantOverrides } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { OverridableStringUnion } from '@mui/types'
import { UserDisplaySize } from './size'

export type UserDisplayTypography = {
    [size in UserDisplaySize]: {
        title:  OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
        text: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
    }
}