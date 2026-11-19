import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  TENANT_PAYMENT_STATUSES,
  TENANT_ROLES,
  Tenant,
  TenantPaymentStatus,
  TenantRole,
} from '../../models/tenant';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-tenant-modal',
  styleUrl: './tenant-modal.css',
  templateUrl: './tenant-modal.html',
})
export class TenantModal implements OnInit {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly fb = inject(NonNullableFormBuilder);

  
  readonly tenant = signal<Tenant | null>(null);
  readonly isEdit = computed(() => this.tenant() !== null);

  readonly roles = TENANT_ROLES;
  readonly statuses = TENANT_PAYMENT_STATUSES;

  readonly form = this.fb.group({
    fullName: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9 ]{9,15}$/)]],
    role: ['USER' as TenantRole, Validators.required],
    paymentStatus: ['al_dia' as TenantPaymentStatus, Validators.required],
    monthlyShare: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit() {
    const current = this.tenant();
    if (current) {
      this.form.patchValue(current);
    }
  }

  isInvalid(field: 'fullName' | 'email' | 'phone' | 'monthlyShare'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const result: Tenant = {
      id: this.tenant()?.id ?? crypto.randomUUID(),
      ...this.form.getRawValue(),
    };
    this.activeModal.close(result);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}