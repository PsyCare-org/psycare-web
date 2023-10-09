import { Language } from 'src/enums'

export const languageLabels = {
    'pt-br': 'Português',
    'en': 'Inglês',
    'es': 'Espanhol'
}

export const languageOptions = Object.values(Language).map(el => ({
    value: el,
    label: languageLabels[el]
}))