import { Menu } from '../types/menu'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined'
import ChecklistIcon from '@mui/icons-material/Checklist'
import EventIcon from '@mui/icons-material/Event'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import StarIcon from '@mui/icons-material/Star'
import { AttendanceStatus } from 'src/enums'

export const useMenus = (status: AttendanceStatus) => {
    const userMenus: Menu[] = [
        { label: 'Detalhes', value: 'details', icon: <DescriptionOutlinedIcon /> },
        { label: 'Afazeres', value: 'follow-up', icon: <ChecklistIcon /> },
        { label: 'Avaliar', value: 'rating', icon: <StarIcon /> },
        ...status === AttendanceStatus.active 
            ? [{ label: 'Encerrar acompanhamento', value: 'delete', icon: <DeleteForeverOutlinedIcon /> } as Menu]
            : []
    ]

    const professionalMenus: Menu[] = [
        { label: 'Detalhes', value: 'details', icon: <DescriptionOutlinedIcon /> },
        { label: 'Prontuário', value: 'medical-record', icon: <MedicalInformationOutlinedIcon /> },
        { label: 'Afazeres', value: 'follow-up', icon: <ChecklistIcon /> },
        { label: 'Encontros', value: 'meetings', icon: <EventIcon /> },
        ...status === AttendanceStatus.active 
            ? [{ label: 'Encerrar acompanhamento', value: 'delete', icon: <DeleteForeverOutlinedIcon /> } as Menu]
            : []
    ]

    return {
        userMenus,
        professionalMenus
    }
}