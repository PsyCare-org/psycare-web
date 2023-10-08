import { Buffer } from 'buffer'

export function useFile(binaryString: string) {
    const base64String = Buffer.from(binaryString, 'binary').toString('base64')
    return 'data:image/png;base64,' + base64String
}