export type User = {
    id: number
    type: 'user' | 'professional'
    name: string
    email: string
    accessToken: string
}