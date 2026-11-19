import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RECEIPT_STATUSES, Receipt } from '../../models/receipt';
import { ReceiptModal } from '../../modals/receipt-modal/receipt-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  selector: 'app-receipts-page',
  styleUrl: './receipts-page.css',
  templateUrl: './receipts-page.html',
})
export class ReceiptsPage {
  private readonly modalService = inject(NgbModal);

  // Datos de prueba hasta conectar con el servicio
  readonly receipts = signal<Receipt[]>([
    {
      id: '1',
      tenantName: 'Miguel Fernández',
      period: '2027-03',
      amount: 225,
      status: 'pagado',
      issuedDate: '2027-03-01',
      hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    },
    {
      id: '2',
      tenantName: 'Carlos Gómez',
      period: '2027-03',
      amount: 225,
      status: 'emitido',
      issuedDate: '2027-03-01',
      hash: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    },
    {
      id: '3',
      tenantName: 'Lucía Ramos',
      period: '2027-03',
      amount: 225,
      status: 'emitido',
      issuedDate: '2027-03-02',
      hash: null,
    },
  ]);

  statusLabel(value: string): string {
    return RECEIPT_STATUSES.find(s => s.value === value)?.label ?? value;
  }

  statusBadge(value: string): string {
    return RECEIPT_STATUSES.find(s => s.value === value)?.badge ?? 'text-bg-secondary';
  }

  shortHash(hash: string): string {
    return hash.slice(0, 12) + '…';
  }

  openAdd() {
    const ref = this.modalService.open(ReceiptModal);
    ref.result.then(
      (created: Receipt) => this.receipts.update(list => [...list, created]),
      () => {}, // modal cerrado sin guardar
    );
  }

  openEdit(receipt: Receipt) {
    const ref = this.modalService.open(ReceiptModal);
    ref.componentInstance.receipt.set(receipt);
    ref.result.then(
      (updated: Receipt) =>
        this.receipts.update(list => list.map(r => (r.id === updated.id ? updated : r))),
      () => {},
    );
  }

  openDelete(receipt: Receipt) {
    const ref = this.modalService.open(ConfirmDeleteModal);
    ref.componentInstance.itemName.set(`${receipt.tenantName} (${receipt.period})`);
    ref.componentInstance.confirmed.subscribe((yes: boolean) => {
      if (yes) {
        this.receipts.update(list => list.filter(r => r.id !== receipt.id));
      }
    });
  }
}
