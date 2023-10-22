import { Divider, IconButton, Link, Tooltip, Typography } from '@mui/material'
import { useApi, usePerson, useSnackbar } from 'src/app/hooks'
import { Attendance } from 'src/types'
import { MolFollowUp, AtomFollowUpForm, FollowUpForm, AtomButton, AtomEmpty } from 'src/app/components'
import { AttendanceStatus } from 'src/enums'
import { Fragment, useState } from 'react'
import './attendance-follow-up.scss'

type Props = {
    data: Attendance
    reload: () => void
}

export const MolAttendanceFollowUp = ({ data, reload }: Props) => {

    const { person } = usePerson()
    const { post } = useApi()
    const { createSnack } = useSnackbar()

    const professionalName = `${data.professional.name} ${data.professional.surname || ''}`
    const isActive = data.status === AttendanceStatus.active

    const [createModal, setCreateModal] = useState<boolean>(false)

    const onCreate = (value: FollowUpForm) => {
        const payload = {
            attendanceId: data.id,
            ...value
        }

        post('/follow-up', payload).then(() => {
            createSnack('Afazer criado com sucesso!', 'success')
            setCreateModal(false)
            reload()
        })
    }

    return (
        <div id='mol-attendance-follow-up'>
            <div id='head'>
                <div id='title'>
                    <Typography variant='h5'>
                        Afazeres
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        { person?.type === 'user' &&
                            `Aqui você encontra as tarefas e afazeres disponibilizados por ${professionalName} relacionados ao acompanhamento. Os afazeres auxiliam no apoio contínuo do atendimento e são uma parte fundamental ao seu bem estar.`
                        }
                        { person?.type === 'professional' &&
                            'Nesta seção, você pode disponibilizar tarefas e afazeres específicos para o paciente relacionados ao acompanhamento. Estas atividades podem incluir leituras recomendadas, exercícios, práticas de mindfulness e muito mais. Utilize esta seção para atribuir tarefas que ajudem o paciente a progredir em sua jornada de autocuidado e crescimento.'
                        }
                    </Typography>
                </div>

                { person?.type === 'professional' && isActive && (
                    <>
                        <AtomButton onClick={() => setCreateModal(true)}>
                            Criar Afazer
                        </AtomButton>

                        { createModal && (
                            <AtomFollowUpForm
                                title='Criar Afazer'
                                confirmBtnLabel='Criar'
                                modal={createModal}
                                setModal={setCreateModal}
                                onSubmit={onCreate}
                            />
                        )}
                    </>
                )}
            </div>

            { !data.followUps || data.followUps.length === 0 && (
                <AtomEmpty title='Nenhum Afazer!'>
                    {person?.type === 'user'
                        ? <>
                            No momento não há nenhum afazer registrado para você. 
                            Caso tenha alguma dúvida ou precise de orientação, não hesite em entrar em contato com {professionalName}.
                        </>
                        : <>
                            No momento não há nenhum afazer registrado. Para adicionar um afazer, utilize o botão acima ou <Link onClick={() => setCreateModal(true)}>clique aqui</Link>
                        </>
                    }
                </AtomEmpty>
            )}

            { data.followUps && data.followUps.length > 0 && (
                <div id='content'>
                    { data.followUps.map(followUp => (
                        <Fragment key={followUp.id}>
                            <MolFollowUp
                                allowEdit={isActive}
                                data={followUp}
                                reload={reload}
                            />
                        </Fragment>
                    ))}
                </div>
            )}
        </div>
    )
}