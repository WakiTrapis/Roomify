import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NOTICE_TYPES, Notice } from '../../models/notice';
import { NoticeModal } from '../../modals/notice-modal/notice-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  selector: 'app-notices-page',
  styleUrl: './notices-page.css',
  templateUrl: './notices-page.html',
})
export class NoticesPage {
  private readonly modalService = inject(NgbModal);

  // Datos de prueba hasta conectar con el servicio
  readonly notices = signal<Notice[]>([
    {
      id: '1',
      title: 'Normas de silencio',
      content: 'Entre las 23:00 y las 8:00 h no se pueden hacer ruidos que molesten a los vecinos.',
      type: 'norma',
      date: '2027-01-15',
    },
    {
      id: '2',
      title: 'Revisión de la caldera',
      content: 'El técnico pasará el jueves por la mañana. Se ruega que alguien esté en casa.',
      type: 'comunicado',
      date: '2027-03-09',
    },
    {
      id: '3',
      title: 'Uso de las zonas comunes',
      content: 'Las zonas comunes deben quedar limpias y ordenadas después de cada uso.',
      type: 'norma',
      date: '2027-01-15',
    },
  ]);

  typeLabel(value: string): string {
    return NOTICE_TYPES.find(t => t.value === value)?.label ?? value;
  }

  typeBadge(value: string): string {
    return NOTICE_TYPES.find(t => t.value === value)?.badge ?? 'text-bg-secondary';
  }

  openAdd() {
    const ref = this.modalService.open(NoticeModal);
    ref.result.then(
      (created: Notice) => this.notices.update(list => [...list, created]),
      () => {}, // modal cerrado sin guardar
    );
  }

  openEdit(notice: Notice) {
    const ref = this.modalService.open(NoticeModal);
    ref.componentInstance.notice.set(notice);
    ref.result.then(
      (updated: Notice) =>
        this.notices.update(list => list.map(n => (n.id === updated.id ? updated : n))),
      () => {},
    );
  }

  openDelete(notice: Notice) {
    const ref = this.modalService.open(ConfirmDeleteModal);
    ref.componentInstance.itemName.set(notice.title);
    ref.componentInstance.confirmed.subscribe((yes: boolean) => {
      if (yes) {
        this.notices.update(list => list.filter(n => n.id !== notice.id));
      }
    });
  }
}