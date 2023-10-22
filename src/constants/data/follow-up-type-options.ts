import { FollowUpType } from 'src/enums'

export const followUpTypesOptions = Object.values(FollowUpType).map(el => ({
    value: el,
    label: el
}))