export type MedicalRecord = {
    id: number
    attendanceId: number
    initialDemand: string
    pastHistory?: string
    intervationPlan?: string
    evolutions?: string
}