import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INVOICE_CATEGORIES, INVOICE_STATUSES, Invoice } from '../../models/invoice';
import { InvoiceModal } from '../../modals/invoice-modal/invoice-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [],
  selector: 'app-invoices-page',
  styleUrl: './invoices-page.css',
  templateUrl: './invoices-page.html',
})
export class InvoicesPage {
  private readonly modalService = inject(NgbModal);

  // Datos de prueba hasta conectar con el servicio
  readonly invoices = signal<Invoice[]>([
    { id: '1', concept: 'Factura de luz', amount: 84.5, category: 'luz', date: '2027-03-10', status: 'pendiente' },
    { id: '2', concept: 'Factura de agua', amount: 32.15, category: 'agua', date: '2027-03-05', status: 'pagada' },
    { id: '3', concept: 'Fibra óptica', amount: 39.9, category: 'internet', date: '2027-02-28', status: 'vencida' },
  ]);

  categoryLabel(value: string): string {
    return INVOICE_CATEGORIES.find(c => c.value === value)?.label ?? value;
  }

  statusLabel(value: string): string {
    return INVOICE_STATUSES.find(s => s.value === value)?.label ?? value;
  }

  statusBadge(value: string): string {
    return INVOICE_STATUSES.find(s => s.value === value)?.badge ?? 'text-bg-secondary';
  }

  openAdd() {
    const ref = this.modalService.open(InvoiceModal);
    ref.result.then(
      (created: Invoice) => this.invoices.update(list => [...list, created]),
      () => {}, // modal cerrado sin guardar
    );
  }

  openEdit(invoice: Invoice) {
    const ref = this.modalService.open(InvoiceModal);
    ref.componentInstance.invoice.set(invoice);
    ref.result.then(
      (updated: Invoice) =>
        this.invoices.update(list => list.map(i => (i.id === updated.id ? updated : i))),
      () => {},
    );
  }

  openDelete(invoice: Invoice) {
    const ref = this.modalService.open(ConfirmDeleteModal);
    ref.componentInstance.itemName.set(invoice.concept);
    ref.componentInstance.confirmed.subscribe((yes: boolean) => {
      if (yes) {
        this.invoices.update(list => list.filter(i => i.id !== invoice.id));
      }
    });
  }
}