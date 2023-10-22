import { useApi, useSnackbar, usePerson } from 'src/app/hooks'
import './styles.scss'
import { FullProfessional } from './types/full-professional'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProfileDataProfessionalForm } from './types/profile-data-professional'
import { profileDataProfessionalFormSchema } from './schemas/profile-data-professional-form-schema'
import { AtomButton, AtomDateField, AtomSelectField, AtomTextField, MaskedField } from 'src/app/components'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import { CircularProgress } from '@mui/material'
import { genderOptions, languageOptions } from 'src/constants'
import dayjs, { Dayjs } from 'dayjs'

export const ProfileDataProfessional = () => {

    const { get, patch } = useApi()
    const { createSnack } = useSnackbar()
    const { person, updateName } = usePerson()

    const [fullProfessional, setFullProfessional] = useState<FullProfessional | null>(null)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors: formErrors, isValid: formIsValid }
    } = useForm<ProfileDataProfessionalForm>({
        resolver: yupResolver(profileDataProfessionalFormSchema),
        reValidateMode: 'onChange',
        mode: 'onChange'
    })

    const submitHandler = (value: ProfileDataProfessionalForm) => {
        const payload = {
            ...value,
            birthDate: (value.birthDate as Dayjs).toDate().toISOString()
        }

        patch(`/professional/${person?.id}`, payload).then((res: FullProfessional) => {
            updateFormValue(res)
            updateName(res.name)
            createSnack('Dados atualizados com sucesso!', 'success')
        })
    }

    const updateFormValue = (value: FullProfessional) => {
        setValue('gender', value.gender)
        setValue('name', value.name)
        setValue('surname', value.surname)
        setValue('phoneNumber', value.phoneNumber)
        setValue('birthDate', dayjs(value.birthDate))
        setValue('languages', value.languages)
        setValue('abstract', value.abstract)
        setValue('expericences', value.expericences || '')
        setValue('specializations', value.specializations || '')
        setValue('description', value.description || '')
        setValue('historic', value.historic || '')
    }

    useEffect(() => {
        get(`/professional/${person?.id}`).then((res: FullProfessional) => {
            setFullProfessional(res)
            updateFormValue(res)
        })
    }, [])

    return fullProfessional
        ? (
            (
                <form
                    id='profile-data-professional'
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <Controller
                        name='name'
                        control={control}
                        render={({ field }) => (
                            <AtomTextField
                                {...field}
                                required
                                id='name'
                                type='text'
                                label='Nome'
                                autoFocus
                                error={!!formErrors.name}
                                helperText={formErrors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        name='surname'
                        control={control}
                        render={({ field }) => (
                            <AtomTextField
                                {...field}
                                id='surname'
                                type='text'
                                label='Sobrenome'
                                error={!!formErrors.surname}
                                helperText={formErrors.surname?.message}
                            />
                        )}
                    />

                    <AtomTextField
                        required
                        disabled
                        id='email'
                        type='text'
                        label='E-mail'
                        value={fullProfessional?.email}
                        startAdornment={<EmailIcon />}
                    />

                    <Controller
                        name='phoneNumber'
                        control={control}
                        render={({ field }) => (
                            <MaskedField
                                mask='(99) 99999-9999'
                                {...field}
                                id='phoneNumber'
                                label='Celular'
                                error={!!formErrors.phoneNumber}
                                helperText={formErrors.phoneNumber?.message}
                                startAdornment={<PhoneIcon />}
                            />
                        )}
                    />

                    <Controller
                        name='gender'
                        control={control}
                        render={({ field: { ref, ...field } }) => (
                            <AtomSelectField
                                required
                                {...field}
                                inputRef={ref}
                                id='gender'
                                label='Gênero'
                                error={!!formErrors.gender}
                                helperText={formErrors.gender?.message}
                                options={genderOptions}
                            />
                        )}
                    />

                    <Controller
                        name='birthDate'
                        control={control}
                        render={({ field }) => (
                            <AtomDateField
                                required
                                {...field}
                                label='Data de Nascimento'
                                error={!!formErrors.birthDate}
                                helperText={formErrors.birthDate?.message}
                                disableFuture
                                disableTyping
                            />
                        )}
                    />

                    <Controller
                        name='languages'
                        control={control}
                        render={({ field }) => (
                            <AtomSelectField
                                required
                                {...field}
                                id='languages'
                                label='Idiomas de atendimento'
                                error={!!formErrors.languages}
                                helperText={formErrors.languages?.message}
                                multiple
                                options={languageOptions}
                            />
                        )}
                    />

                    <Controller
                        name='abstract'
                        control={control}
                        render={({ field }) => (
                            <AtomTextField
                                required
                                {...field}
                                id='abstract'
                                label='Resumo'
                                error={!!formErrors.abstract}
                                helperText={formErrors.abstract
                                    ? formErrors.abstract?.message
                                    : 'Insira um breve texto que servirá para lhe introduzir os usuários da plataforma'
                                }
                                multiline
                                maxRows={10}
                            />
                        )}
                    />

                    <Controller
                        name='expericences'
                        control={control}
                        render={({ field }) => (
                            <AtomTextField
                                {...field}
                                id='expericences'
                                label='Experiência'
                                error={!!formErrors.expericences}
                                helperText={formErrors.expericences
                                    ? formErrors.expericences?.message
                                    : 'Liste os tópicos que você possui experiência em abordar'
                                }
                                multiline
                                maxRows={10}
                            />
                        )}
                    />

                    <Controller
                        name='specializations'
                        control={control}
                        render={({ field }) => (
                            <AtomTextField
                                {...field}
                                id='specializations'
                                label='Especialidades'
                                error={!!formErrors.specializations}
                                helperText={formErrors.specializations
                                    ? formErrors.specializations?.message
                                    : 'Liste os tópicos que você é possui especialidade em tratar'
                                }
                                multiline
                                maxRows={10}
                            />
                        )}
                    />

                    <Controller
                        name='historic'
                        control={control}
                        render={({ field }) => (
                            <AtomTextField
                                {...field}
                                id='historic'
                                label='Formação'
                                error={!!formErrors.historic}
                                helperText={formErrors.historic
                                    ? formErrors.historic?.message
                                    : 'Descreva sua formação acadêmica'
                                }
                                multiline
                                maxRows={10}
                            />
                        )}
                    />

                    <Controller
                        name='description'
                        control={control}
                        render={({ field }) => (
                            <AtomTextField
                                {...field}
                                id='description'
                                label='Descrição pessoal'
                                error={!!formErrors.description}
                                helperText={formErrors.description?.message}
                                multiline
                                maxRows={10}
                            />
                        )}
                    />


                    <div>
                        <AtomButton
                            type='submit'
                            variant='contained'
                            disabled={!formIsValid}
                        >
                            Atualizar
                        </AtomButton>
                    </div>
                </form>
            )
        )
        : (
            <CircularProgress color='secondary' size='100px' />
        )
}