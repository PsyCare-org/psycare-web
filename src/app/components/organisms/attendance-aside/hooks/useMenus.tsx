import { Menu } from '../types/menu'
import DescriptionIcon from '@mui/icons-material/Description'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import ChecklistIcon from '@mui/icons-material/Checklist'
import EventIcon from '@mui/icons-material/Event'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'

export const useMenus = () => {
    const userMenus: Menu[] = [
        { label: 'Detalhes', value: 'details', icon: <DescriptionIcon /> },
        { label: 'Afazeres', value: 'follow-up', icon: <ChecklistIcon /> },
        { label: 'Encontros', value: 'meetings', icon: <EventIcon /> },
        { label: 'Avaliar', value: 'rating', icon: <StarIcon /> },
        { label: 'Encerrar acompanhamento', value: 'delete', icon: <DeleteIcon /> }
    ]

    const professionalMenus: Menu[] = [
        { label: 'Detalhes', value: 'details', icon: <DescriptionIcon /> },
        { label: 'Prontuário', value: 'medical-record', icon: <MedicalInformationIcon /> },
        { label: 'Afazeres', value: 'follow-up', icon: <ChecklistIcon /> },
        { label: 'Encontros', value: 'meetings', icon: <EventIcon /> },
        { label: 'Encerrar acompanhamento', value: 'delete', icon: <DeleteIcon /> }
    ]

    return {
        userMenus,
        professionalMenus
    }
}