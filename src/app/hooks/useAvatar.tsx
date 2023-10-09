export function useAvatar(buffer: number[]) {
    const base64String = btoa(String.fromCharCode.apply(null, buffer))
    return 'data:image/png;base64,' + base64String
}