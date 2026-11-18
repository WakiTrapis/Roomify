export type ReceiptStatus = 'emitido' | 'pagado' | 'anulado';

export interface Receipt {
    id: string;
    tenantName: string;
    period: string;
    amount: number;
    status: ReceiptStatus;
    issuedDate: string;
    hash: string | null;
}
