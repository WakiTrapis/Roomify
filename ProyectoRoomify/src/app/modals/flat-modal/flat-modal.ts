import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FLAT_MODES, Flat, FlatMode } from '../../models/flat';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-flat-modal',
  styleUrl: './flat-modal.css',
  templateUrl: './flat-modal.html',
})
export class FlatModal implements OnInit {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly flat = signal<Flat | null>(null);
  readonly isEdit = computed(() => this.flat() !== null);

  // No se pueden tener menos habitaciones que inquilinos actuales
  readonly minRooms = computed(() => Math.max(1, this.flat()?.tenantsCount ?? 1));

  readonly modes = FLAT_MODES;

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    address: ['', [Validators.required, Validators.maxLength(120)]],
    rooms: [1, [Validators.required, Validators.min(1), Validators.max(20), Validators.pattern(/^\d+$/)]],
    monthlyRent: [0, [Validators.required, Validators.min(0.01)]],
    mode: ['autogestionado' as FlatMode, Validators.required],
  });

  ngOnInit() {
    const current = this.flat();
    if (current) {
      this.form.patchValue(current);
      this.form.controls.rooms.addValidators(Validators.min(this.minRooms()));
      this.form.controls.rooms.updateValueAndValidity();
    }
  }

  isInvalid(field: 'name' | 'address' | 'rooms' | 'monthlyRent'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const current = this.flat();
    const result: Flat = {
      id: current?.id ?? crypto.randomUUID(),
      // El código y los contadores los gestiona la API: aquí se conservan o empiezan a 0
      code: current?.code ?? 'FLAT-' + Math.floor(1000 + Math.random() * 9000),
      tenantsCount: current?.tenantsCount ?? 0,
      openIncidences: current?.openIncidences ?? 0,
      overdueTenants: current?.overdueTenants ?? 0,
      ...this.form.getRawValue(),
    };
    this.activeModal.close(result);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
