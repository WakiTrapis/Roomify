import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tenant } from '../../models/tenant';
import { TenantCard } from '../../components/tenant-card/tenant-card';
import { TenantModal } from '../../modals/tenant-modal/tenant-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [TenantCard],
  selector: 'app-tenants-page',
  styleUrl: './tenants-page.css',
  templateUrl: './tenants-page.html',
})
export class TenantsPage {
  private readonly modalService = inject(NgbModal);

  // Datos mock hasta conectar con el servicio
  readonly tenants = signal<Tenant[]>([
    {
      id: '1',
      fullName: 'Miguel Fernández',
      email: 'miguel.f@ejemplo.com',
      phone: '+34 612 345 678',
      role: 'ADMIN_PLUS',
      paymentStatus: 'al_dia',
      monthlyShare: 225,
    },
    {
      id: '2',
      fullName: 'Carlos Gómez',
      email: 'carlos.g@ejemplo.com',
      phone: '+34 611 222 333',
      role: 'USER',
      paymentStatus: 'pendiente',
      monthlyShare: 225,
    },
    {
      id: '3',
      fullName: 'Lucía Ramos',
      email: 'lucia.r@ejemplo.com',
      phone: '+34 622 111 444',
      role: 'USER',
      paymentStatus: 'moroso',
      monthlyShare: 225,
    },
  ]);

  openAdd() {
    const ref = this.modalService.open(TenantModal);
    ref.result.then(
      (created: Tenant) => this.tenants.update(list => [...list, created]),
      () => {}, // modal cerrado sin guardar
    );
  }

  openEdit(tenant: Tenant) {
    const ref = this.modalService.open(TenantModal);
    ref.componentInstance.tenant.set(tenant);
    ref.result.then(
      (updated: Tenant) =>
        this.tenants.update(list => list.map(t => (t.id === updated.id ? updated : t))),
      () => {},
    );
  }

  openDelete(tenant: Tenant) {
    const ref = this.modalService.open(ConfirmDeleteModal);
    ref.componentInstance.itemName.set(tenant.fullName);
    ref.componentInstance.confirmed.subscribe((yes: boolean) => {
      if (yes) {
        this.tenants.update(list => list.filter(t => t.id !== tenant.id));
      }
    });
  }
}