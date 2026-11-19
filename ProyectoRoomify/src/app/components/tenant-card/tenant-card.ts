import { Component, computed, input, output } from '@angular/core';
import {
  TENANT_PAYMENT_STATUSES,
  TENANT_ROLES,
  Tenant,
} from '../../models/tenant';

@Component({
  selector: 'app-tenant-card',
  styleUrl: './tenant-card.css',
  templateUrl: './tenant-card.html',
})
export class TenantCard {
  // Datos que recibe del padre
  readonly tenant = input.required<Tenant>();

  // Eventos que avisan al padre
  readonly edit = output<Tenant>();
  readonly remove = output<Tenant>();

  readonly initials = computed(() =>
    this.tenant()
      .fullName.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join(''),
  );

  readonly statusLabel = computed(
    () => TENANT_PAYMENT_STATUSES.find(s => s.value === this.tenant().paymentStatus)?.label ?? '',
  );

  readonly statusBadge = computed(
    () =>
      TENANT_PAYMENT_STATUSES.find(s => s.value === this.tenant().paymentStatus)?.badge ??
      'text-bg-secondary',
  );

  readonly roleLabel = computed(
    () => TENANT_ROLES.find(r => r.value === this.tenant().role)?.label ?? '',
  );
}