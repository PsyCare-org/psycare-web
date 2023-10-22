import { Menu } from '../types/menu'
import DescriptionIcon from '@mui/icons-material/Description'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import ChecklistIcon from '@mui/icons-material/Checklist'
import EventIcon from '@mui/icons-material/Event'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import { AttendanceStatus } from 'src/enums'

export const useMenus = (status: AttendanceStatus) => {
    const userMenus: Menu[] = [
        { label: 'Detalhes', value: 'details', icon: <DescriptionIcon /> },
        { label: 'Afazeres', value: 'follow-up', icon: <ChecklistIcon /> },
        { label: 'Encontros', value: 'meetings', icon: <EventIcon /> },
        { label: 'Avaliar', value: 'rating', icon: <StarIcon /> },
        ...status === AttendanceStatus.active 
            ? [{ label: 'Encerrar acompanhamento', value: 'delete', icon: <DeleteIcon /> } as Menu]
            : []
    ]

    const professionalMenus: Menu[] = [
        { label: 'Detalhes', value: 'details', icon: <DescriptionIcon /> },
        { label: 'Prontuário', value: 'medical-record', icon: <MedicalInformationIcon /> },
        { label: 'Afazeres', value: 'follow-up', icon: <ChecklistIcon /> },
        { label: 'Encontros', value: 'meetings', icon: <EventIcon /> },
        ...status === AttendanceStatus.active 
            ? [{ label: 'Encerrar acompanhamento', value: 'delete', icon: <DeleteIcon /> } as Menu]
            : []
    ]

    return {
        userMenus,
        professionalMenus
    }
}