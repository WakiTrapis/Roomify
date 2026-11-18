import { Component, inject, output, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [],
  selector: 'app-confirm-delete-modal',
  styleUrl: './confirm-delete-modal.css',
  templateUrl: './confirm-delete-modal.html',
})
export class ConfirmDeleteModal {
  private readonly activeModal = inject(NgbActiveModal);

  // Nombre del elemento a eliminar, lo rellena la page que abre el modal
  readonly itemName = signal('este elemento');

  // Devuelve true si el usuario confirma y false si cancela
  readonly confirmed = output<boolean>();

  confirm() {
    this.confirmed.emit(true);
    this.activeModal.close(true);
  }

  cancel() {
    this.confirmed.emit(false);
    this.activeModal.dismiss(false);
  }
}
