import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  INCIDENCE_PRIORITIES,
  INCIDENCE_STATUSES,
  Incidence,
  IncidencePriority,
  IncidenceStatus,
} from '../../models/incidence';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-incidence-modal',
  styleUrl: './incidence-modal.css',
  templateUrl: './incidence-modal.html',
})
export class IncidenceModal implements OnInit {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly fb = inject(NonNullableFormBuilder);

  // null = alta nueva; con datos = edición. Lo rellena la page.
  readonly incidence = signal<Incidence | null>(null);
  readonly isEdit = computed(() => this.incidence() !== null);

  readonly priorities = INCIDENCE_PRIORITIES;
  readonly statuses = INCIDENCE_STATUSES;

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    priority: ['media' as IncidencePriority, Validators.required],
    status: ['pendiente' as IncidenceStatus, Validators.required],
    technician: [''],
    reportedBy: ['Propietario', Validators.required],
    date: ['', Validators.required],
  });

  ngOnInit() {
    const current = this.incidence();
    if (current) {
      this.form.patchValue({ ...current, technician: current.technician ?? '' });
    } else {
      this.form.patchValue({ date: new Date().toISOString().slice(0, 10) });
    }
  }

  isInvalid(field: 'title' | 'description' | 'reportedBy' | 'date'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const result: Incidence = {
      id: this.incidence()?.id ?? crypto.randomUUID(),
      ...raw,
      technician: raw.technician.trim() || null,
    };
    this.activeModal.close(result);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
