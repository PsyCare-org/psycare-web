import { Controller, useForm } from 'react-hook-form'
import { Filter } from './types/filter'
import { yupResolver } from '@hookform/resolvers/yup'
import { FilterSchema } from './schemas/filter-schema'
import { AtomButton, AtomSelectField, AtomTextField } from 'src/app/components'
import { languageOptions, typeOptions } from 'src/constants'
import './styles.scss'

type Props = {
    onChange: (value: Filter) => void
}

export const ProfessionalsFilter = ({ onChange }: Props) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors: formErrors, isValid: formIsValid },
    } = useForm<Filter>({
        resolver: yupResolver(FilterSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            languages: [],
            name: '',
            reason: '',
            types: []
        }
    })

    const submit = (value: Filter) => {
        const formatedValue: Filter = Object.entries(value)
            .filter(([_, value]) => !!value && value.length > 0)
            .reduce((acc, [key, value]) => {
                acc[key as keyof Filter] = value
                return acc
            }, {} as any)

        console.log(formatedValue)

        onChange(formatedValue)
    }

    const clear = () => {
        reset()
        onChange({})
    }

    return (
        <form 
            id='professionals-filter'
            onSubmit={handleSubmit(submit)}
        >
            <Controller
                name='name'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        {...field}
                        id='name'
                        type='text'
                        label='Nome'
                        error={!!formErrors.name}
                        helperText={formErrors.name?.message}
                    />
                )}
            />

            <Controller
                name='types'
                control={control}
                render={({ field }) => (
                    <AtomSelectField
                        {...field}
                        multiple
                        id='types'
                        label='Especialização'
                        error={!!formErrors.types}
                        helperText={formErrors.types?.message}
                        options={typeOptions}
                    />
                )}
            />

            <Controller
                name='languages'
                control={control}
                render={({ field }) => (
                    <AtomSelectField
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
                name='reason'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        {...field}
                        id='reason'
                        type='text'
                        label='Razão da procura'
                        error={!!formErrors.reason}
                        helperText={formErrors.reason
                            ? formErrors.reason?.message
                            : 'Utilize palavras chave para buscar nos detalhes do profissional'
                        }
                    />
                )}
            />

            <div id='actions'>
                <AtomButton
                    variant='contained'
                    type='submit'
                    disabled={!formIsValid}
                >
                    Procurar
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
    )
}