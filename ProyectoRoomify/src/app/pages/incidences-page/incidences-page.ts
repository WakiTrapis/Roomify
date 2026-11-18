import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INCIDENCE_PRIORITIES, INCIDENCE_STATUSES, Incidence } from '../../models/incidence';
import { IncidenceModal } from '../../modals/incidence-modal/incidence-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [],
  selector: 'app-incidences-page',
  styleUrl: './incidences-page.css',
  templateUrl: './incidences-page.html',
})
export class IncidencesPage {
  private readonly modalService = inject(NgbModal);

  // Datos de prueba hasta conectar con el servicio
  readonly incidences = signal<Incidence[]>([
    {
      id: '1',
      title: 'Grifo roto en la cocina',
      description: 'El grifo gotea de forma continua desde ayer.',
      priority: 'alta',
      status: 'pendiente',
      technician: null,
      reportedBy: 'Lucía Ramos',
      date: '2027-03-12',
    },
    {
      id: '2',
      title: 'Persiana atascada',
      description: 'La persiana del salón no sube del todo.',
      priority: 'media',
      status: 'en_curso',
      technician: 'Manuel R.',
      reportedBy: 'Carlos Gómez',
      date: '2027-03-08',
    },
    {
      id: '3',
      title: 'Bombilla del pasillo fundida',
      description: 'Hay que cambiar la bombilla del pasillo.',
      priority: 'baja',
      status: 'resuelta',
      technician: 'Propietario',
      reportedBy: 'Elena S.',
      date: '2027-02-27',
    },
  ]);

  priorityLabel(value: string): string {
    return INCIDENCE_PRIORITIES.find(p => p.value === value)?.label ?? value;
  }

  priorityBadge(value: string): string {
    return INCIDENCE_PRIORITIES.find(p => p.value === value)?.badge ?? 'text-bg-secondary';
  }

  statusLabel(value: string): string {
    return INCIDENCE_STATUSES.find(s => s.value === value)?.label ?? value;
  }

  statusBadge(value: string): string {
    return INCIDENCE_STATUSES.find(s => s.value === value)?.badge ?? 'text-bg-secondary';
  }

  openAdd() {
    const ref = this.modalService.open(IncidenceModal);
    ref.result.then(
      (created: Incidence) => this.incidences.update(list => [...list, created]),
      () => {}, // modal cerrado sin guardar
    );
  }

  openEdit(incidence: Incidence) {
    const ref = this.modalService.open(IncidenceModal);
    ref.componentInstance.incidence.set(incidence);
    ref.result.then(
      (updated: Incidence) =>
        this.incidences.update(list => list.map(i => (i.id === updated.id ? updated : i))),
      () => {},
    );
  }

  openDelete(incidence: Incidence) {
    const ref = this.modalService.open(ConfirmDeleteModal);
    ref.componentInstance.itemName.set(incidence.title);
    ref.componentInstance.confirmed.subscribe((yes: boolean) => {
      if (yes) {
        this.incidences.update(list => list.filter(i => i.id !== incidence.id));
      }
    });
  }
}
