export type SummaryColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface DashboardStat {
    title: string;
    value: string;
    icon: string;
    color: SummaryColor;
    hint?: string;
}