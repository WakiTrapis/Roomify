import { Component, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from '../../models/contract';

// La fecha de fin debe ser posterior a la de inicio
function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const start = group.get('startDate')?.value;
  const end = group.get('endDate')?.value;
  return start && end && end <= start ? { dateRange: true } : null;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-contract-modal',
  styleUrl: './contract-modal.css',
  templateUrl: './contract-modal.html',
})
export class ContractModal implements OnInit {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly fb = inject(NonNullableFormBuilder);


  readonly contract = signal<Contract | null>(null);

  readonly form = this.fb.group(
    {
      monthlyRent: [0, [Validators.required, Validators.min(0.01)]],
      deposit: [0, [Validators.required, Validators.min(0)]],
      iban: ['', [Validators.required, Validators.pattern(/^ES\d{2}(\s?\d{4}){5}$/i)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    },
    { validators: dateRangeValidator },
  );

  ngOnInit() {
    const current = this.contract();
    if (current) {
      this.form.patchValue(current);
    }
  }

  isInvalid(field: 'monthlyRent' | 'deposit' | 'iban' | 'startDate' | 'endDate'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const result: Contract = {
      id: this.contract()?.id ?? crypto.randomUUID(),
      ...raw,
      iban: raw.iban.replace(/\s/g, '').toUpperCase(),
    };
    this.activeModal.close(result);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}