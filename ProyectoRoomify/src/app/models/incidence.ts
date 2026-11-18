export type IncidencePriority = 'baja' | 'media' | 'alta' | 'urgente';
export type IncidenceStatus = 'pendiente' | 'en_curso' | 'resuelta';

export interface Incidence {
    id: string;
    title: string;
    description: string;
    priority: IncidencePriority;
    status: IncidenceStatus;
    technician: string | null;
    reportedBy: string;
    date: string;
}