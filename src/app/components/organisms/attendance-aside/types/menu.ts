import { ReactNode } from 'react'

export type MenuValue = 'rating' | 'details' | 'medical-record' | 'meetings' | 'follow-up' | 'delete'

export type Menu = {
    icon: ReactNode,
    label: string,
    value: MenuValue
}