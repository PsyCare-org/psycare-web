export type Page = {
    name: string
    url: string
}

export const userPages: Page[] = [
    { name: 'Profissionais', url: '/professionals'},
    { name: 'Acompanhamentos', url: '/attendances'},
    { name: 'Histórico', url: '/historic'},
    { name: 'Agenda', url: '/calendar'},
]

export const professionalPages: Page[] = [
    { name: 'Pacientes', url: '/patients' },
    { name: 'Histórico', url: '/historic' },
    { name: 'Agenda', url: '/calendar'},
]
