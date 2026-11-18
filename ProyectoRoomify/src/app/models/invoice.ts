export type InvoiceCategory = 'luz' | 'agua' | 'internet' | 'gas' | 'otros';
export type InvoiceStatus = 'pendiente' | 'pagada' | 'vencida';

export interface Invoice {
    id: string;
    concept: string;
    amount: number;
    category: InvoiceCategory;
    date: string;
    status: InvoiceStatus;
}

export const INVOICE_CATEGORIES: { value: InvoiceCategory; label: string }[] = [
    { value: 'luz', label: 'Luz' },
    { value: 'agua', label: 'Agua' },
    { value: 'internet', label: 'Internet' },
    { value: 'gas', label: 'Gas' },
    { value: 'otros', label: 'Otros' },
];

export const INVOICE_STATUSES: { value: InvoiceStatus; label: string; badge: string }[] = [
    { value: 'pendiente', label: 'Pendiente', badge: 'text-bg-warning' },
    { value: 'pagada', label: 'Pagada', badge: 'text-bg-success' },
    { value: 'vencida', label: 'Vencida', badge: 'text-bg-danger' },
];
