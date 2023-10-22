import { MedicalRecord as MedicalRecordType } from 'src/types/medical-record'

export type MedicalRecord = Omit<MedicalRecordType, 'id' | 'attendanceId'>