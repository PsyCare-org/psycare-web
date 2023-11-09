import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MeetingFilter } from './types/meeting-filter'
import { filterSchema } from './schemas/schema'
import { AtomTextField, AtomDateField, AtomButton } from 'src/app/components'
import './meeting-filter.scss'
import { Collapse } from '@mui/material'

type Props = {
    onSubmit: (value: MeetingFilter) => void
}

export const MolMeetingFilter = ({ onSubmit }: Props) => {

    const [clearFlag, setClearFlag] = useState<boolean>(true)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors: formErrors, isValid: formIsValid },
    } = useForm<MeetingFilter>({
        resolver: yupResolver(filterSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            keyword: ''
        }
    })

    const submit = (value: MeetingFilter) => {
        const formatedValue: MeetingFilter = Object.entries(value)
            .filter(([_, value]) => !!value)
            .reduce((acc, [key, value]) => {
                acc[key as keyof MeetingFilter] = value
                return acc
            }, {} as any)

        onSubmit(formatedValue)
    }

    const clear = () => {
        reset()
        setClearFlag(false)
        setTimeout(() => setClearFlag(true), 1)
        onSubmit({})
    }

    return (
        <div id='mol-meeting-filter'>
            { clearFlag && (
                <form
                    id='meeting-filter'
                    onSubmit={handleSubmit(submit)}
                >
                    <Controller
                        name='startDate'
                        control={control}
                        render={({ field }) => (
                            <AtomDateField
                                {...field}
                                label='Desde'
                                error={!!formErrors.startDate}
                                helperText={formErrors.startDate?.message}
                                disableTyping
                            />
                        )}
                    />

                    <Controller
                        name='endDate'
                        control={control}
                        render={({ field }) => (
                            <AtomDateField
                                {...field}
                                label='Até'
                                error={!!formErrors.endDate}
                                helperText={formErrors.endDate?.message}
                                disableTyping
                            />
                        )}
                    />

                    <Controller
                        name='keyword'
                        control={control}
                        render={({ field }) => (
                            <AtomTextField
                                {...field}
                                id='keyword'
                                type='text'
                                label='Conteúdo'
                                error={!!formErrors.keyword}
                                helperText={formErrors.keyword?.message}
                            />
                        )}
                    />

                    <div id='actions'>
                        <AtomButton
                            variant='contained'
                            type='submit'
                            disabled={!formIsValid}
                        >
                            Filtrar
                        </AtomButton>

                        <AtomButton
                            variant='text'
                            type='button'
                            onClick={clear}
                        >
                            Limpar
                        </AtomButton>
                    </div>
                </form>
            )}
        </div>
    )
}