import { INVOICE_CATEGORIES, INVOICE_STATUSES, Invoice } from '../models/invoice';
import { PrintDocument } from '../models/printDocument';
import { RECEIPT_STATUSES, Receipt } from '../models/receipt';

// 2027-03-10 -> 10/03/2027
function formatDate(iso: string): string {
    return iso.split('-').reverse().join('/');
}

// 84.5 -> 84,50 €
function formatMoney(amount: number): string {
    return amount.toFixed(2).replace('.', ',') + ' €';
}

// 2027-03 -> marzo de 2027
function formatPeriod(period: string): string {
    const [year, month] = period.split('-').map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
}

export function invoiceToPrintDocument(invoice: Invoice): PrintDocument {
    return {
        title: 'Factura',
        reference: invoice.id.slice(0, 8).toUpperCase(),
        rows: [
            { label: 'Concepto', value: invoice.concept },
            {
                label: 'Categoría',
                value: INVOICE_CATEGORIES.find(c => c.value === invoice.category)?.label ?? invoice.category,
            },
            { label: 'Fecha', value: formatDate(invoice.date) },
            { label: 'Importe', value: formatMoney(invoice.amount) },
            {
                label: 'Estado',
                value: INVOICE_STATUSES.find(s => s.value === invoice.status)?.label ?? invoice.status,
            },
        ],
        photoUrl: invoice.photoUrl ?? null,
        seal: null,
    };
}

export function receiptToPrintDocument(receipt: Receipt): PrintDocument {
    return {
        title: 'Recibo de pago',
        reference: receipt.id.slice(0, 8).toUpperCase(),
        rows: [
            { label: 'Inquilino', value: receipt.tenantName },
            { label: 'Periodo', value: formatPeriod(receipt.period) },
            { label: 'Importe', value: formatMoney(receipt.amount) },
            {
                label: 'Estado',
                value: RECEIPT_STATUSES.find(s => s.value === receipt.status)?.label ?? receipt.status,
            },
            { label: 'Fecha de emisión', value: formatDate(receipt.issuedDate) },
        ],
        photoUrl: receipt.photoUrl ?? null,
        seal: receipt.hash,
    };
}