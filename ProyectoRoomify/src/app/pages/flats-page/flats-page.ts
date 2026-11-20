import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Flat } from '../../models/flat';
import { Flats } from '../../services/flats';
import { FlatCard } from '../../components/flat-card/flat-card';
import { FlatModal } from '../../modals/flat-modal/flat-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [FlatCard],
  selector: 'app-flats-page',
  styleUrl: './flats-page.css',
  templateUrl: './flats-page.html',
})
export class FlatsPage {
  private readonly modalService = inject(NgbModal);

  // La lista vive en el servicio porque la comparten otros componentes
  readonly flats = inject(Flats).flats;

  openAdd() {
    const ref = this.modalService.open(FlatModal);
    ref.result.then(
      (created: Flat) => this.flats.update(list => [...list, created]),
      () => {}, // modal cerrado sin guardar
    );
  }

  openEdit(flat: Flat) {
    const ref = this.modalService.open(FlatModal);
    ref.componentInstance.flat.set(flat);
    ref.result.then(
      (updated: Flat) => this.flats.update(list => list.map(f => (f.id === updated.id ? updated : f))),
      () => {},
    );
  }

  openDelete(flat: Flat) {
    const ref = this.modalService.open(ConfirmDeleteModal);
    ref.componentInstance.itemName.set(flat.name);
    ref.componentInstance.confirmed.subscribe((yes: boolean) => {
      if (yes) {
        this.flats.update(list => list.filter(f => f.id !== flat.id));
      }
    });
  }
}
