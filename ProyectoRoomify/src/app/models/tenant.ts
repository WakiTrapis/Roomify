export type TenantPaymentStatus = 'al_dia' | 'pendiente' | 'moroso';

export interface Tenant {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: 'ADMIN_PLUS' | 'USER';
    paymentStatus: TenantPaymentStatus;
    monthlyShare: number;
}
