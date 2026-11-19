export type TenantPaymentStatus = 'al_dia' | 'pendiente' | 'moroso';
export type TenantRole = 'ADMIN_PLUS' | 'USER';

export interface Tenant {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: TenantRole;
    paymentStatus: TenantPaymentStatus;
    monthlyShare: number;
}

export const TENANT_PAYMENT_STATUSES: { value: TenantPaymentStatus; label: string; badge: string }[] = [
    { value: 'al_dia', label: 'Al día', badge: 'text-bg-success' },
    { value: 'pendiente', label: 'Pendiente', badge: 'text-bg-warning' },
    { value: 'moroso', label: 'Moroso', badge: 'text-bg-danger' },
];

export const TENANT_ROLES: { value: TenantRole; label: string }[] = [
    { value: 'ADMIN_PLUS', label: 'Inquilino admin (ADMIN+)' },
    { value: 'USER', label: 'Inquilino' },
];
