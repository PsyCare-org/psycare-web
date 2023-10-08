import { Avatar, CircularProgress, Typography } from '@mui/material'
import { ChangeEvent, createRef, useEffect, useState } from 'react'
import { useFile, useSnackbar, useUser } from 'src/app/hooks'
import useApi from 'src/app/hooks/useApi'
import { AtomButton } from 'src/app/components'
import './styles.scss'

export const ProfileAvatar = () => {

    const { user, updateAvatar } = useUser()
    const { getFile, post, del } = useApi()
    const { createSnack } = useSnackbar()

    const imgInputRef = createRef<HTMLInputElement>()

    const [loading, setLoading] = useState<boolean>(true)
    const [img, setImg] = useState<string>('')

    const loadUserImg = (updateGlobalAvatar = false) => {
        getFile(`/avatar/${user?.type}/${user?.id}`)
            .then(res => {
                const newImg = useFile(res)
                setImg(newImg)
                if(updateGlobalAvatar) updateAvatar(newImg)
            })
            .finally(() => setLoading(false))
    }

    const uploadImg = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        if(files === null) return

        setLoading(true)

        const payload = new FormData()
        payload.append('file', files[0])

        post(`/avatar/${user?.type}/${user?.id}`, payload).then(() => {
            createSnack('Avatar atualizado com sucesso!', 'success')
            loadUserImg(true)
        })
    }

    const deleteImg = () => {
        setLoading(true)

        del(`/avatar/${user?.type}/${user?.id}`).then(() => {
            createSnack('Avatar removido com sucesso!', 'success')
            loadUserImg(true)
        })
    }

    useEffect(() => {
        loadUserImg()
    }, [])

    return (
        <div id='profile-avatar'>
            <div id='title'>
                <Typography variant='h5'>
                    Avatar
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Adicione, atualize ou remova a sua foto de avatar abaixo.
                </Typography>
            </div>

            <form>
                <div id='avatar'>
                    { loading && (
                        <div id='loading-overlay'>
                            <CircularProgress color='secondary' size='100px'/>
                        </div>
                    )}

                    <Avatar src={img} />
                </div>

                <div id='controls'>
                    <AtomButton 
                        variant='outlined'
                        onClick={() => imgInputRef.current?.click()}
                    >
                        Carregar imagem
                    </AtomButton>

                    <AtomButton 
                        variant='text' 
                        color='error' 
                        onClick={deleteImg}
                    >
                        Remover imagem
                    </AtomButton>

                    <input
                        id='img-input' 
                        type='file' 
                        accept='image/png,image/jpeg'
                        ref={imgInputRef}
                        hidden
                        onChange={evt => uploadImg(evt)}
                    />
                </div>
            </form>
        </div>
    )
}