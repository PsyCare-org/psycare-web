import { ReactNode } from 'react'

export type MenuValue = 'data' | 'avatar' | 'password' | 'delete'

export type Menu = {
    icon: ReactNode,
    label: string,
    value: MenuValue
}