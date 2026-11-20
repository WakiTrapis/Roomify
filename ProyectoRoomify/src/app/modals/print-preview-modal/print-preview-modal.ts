import { Component, inject, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrintDocument } from '../../models/printDocument';

@Component({
  selector: 'app-print-preview-modal',
  styleUrl: './print-preview-modal.css',
  templateUrl: './print-preview-modal.html',
})
export class PrintPreviewModal {
  private readonly activeModal = inject(NgbActiveModal);

  // Lo rellena la page que abre el modal
  readonly doc = signal<PrintDocument | null>(null);

  readonly today = new Date().toLocaleDateString('es-ES');

  print() {
    window.print();
  }

  close() {
    this.activeModal.dismiss();
  }
}
