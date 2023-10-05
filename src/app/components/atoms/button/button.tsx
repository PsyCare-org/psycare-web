import { Button, ButtonProps, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import useApi from 'src/app/hooks/useApi'
import env from 'src/constants/env'

type Props = {
    intercept?: string
} & ButtonProps

export const ButtonAtom = ({
    intercept,
    ...buttonProps
}: Props) => {

    const { axios } = useApi()

    const [loading, setLoading] = useState<boolean>(false)

    const interceptHandler = () => {
        const interceptUrl = `${env.dataApiUrl}${intercept}`

        axios.interceptors.request.use(
            req => {
                if(req.url === interceptUrl) setLoading(true)
                return req
            }
        )
    
        axios.interceptors.response.use(
            res => {
                if(res.config.url === interceptUrl) setLoading(false)
                return res
            }, 
            err => {
                if(err.config.url === interceptUrl) setLoading(false)
                return err
            }
        )
    }

    useEffect(() => {
        if(intercept) {
            interceptHandler()
        }
    }, [])

    return (
        <Button
            {...buttonProps}
            { ...intercept && loading && {
                disabled: true,
                children: <CircularProgress size='24.5px' />
            }}
        />
    )
}