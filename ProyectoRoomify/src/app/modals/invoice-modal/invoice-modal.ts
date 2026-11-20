import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  INVOICE_CATEGORIES,
  INVOICE_STATUSES,
  Invoice,
  InvoiceCategory,
  InvoiceStatus,
} from '../../models/invoice';
import { PhotoUpload } from '../../components/photo-upload/photo-upload';

@Component({
  imports: [ReactiveFormsModule, PhotoUpload],
  selector: 'app-invoice-modal',
  styleUrl: './invoice-modal.css',
  templateUrl: './invoice-modal.html',
})
export class InvoiceModal implements OnInit {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly invoice = signal<Invoice | null>(null);
  readonly isEdit = computed(() => this.invoice() !== null);
  
  readonly categories = INVOICE_CATEGORIES;
  readonly statuses = INVOICE_STATUSES;

  readonly form = this.fb.group({
    concept: ['', [Validators.required, Validators.maxLength(80)]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    category: ['luz' as InvoiceCategory, Validators.required],
    date: ['', Validators.required],
    status: ['pendiente' as InvoiceStatus, Validators.required],
  });

  

  isInvalid(field: 'concept' | 'amount' | 'date'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  cancel() {
    this.activeModal.dismiss();
  }

  readonly photo = signal<string | null>(null);

  ngOnInit() {
    const current = this.invoice();
    if (current) {
      this.form.patchValue(current);
      this.photo.set(current.photoUrl ?? null);
    } else {
      this.form.patchValue({ date: new Date().toISOString().slice(0, 10) });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const result: Invoice = {
      id: this.invoice()?.id ?? crypto.randomUUID(),
      ...this.form.getRawValue(),
      photoUrl: this.photo(),
    };
    this.activeModal.close(result);
  }
}
