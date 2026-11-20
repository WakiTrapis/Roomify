import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RECEIPT_STATUSES, Receipt, ReceiptStatus } from '../../models/receipt';
import { PhotoUpload } from '../../components/photo-upload/photo-upload';

@Component({
  imports: [ReactiveFormsModule, PhotoUpload],
  selector: 'app-receipt-modal',
  styleUrl: './receipt-modal.css',
  templateUrl: './receipt-modal.html',
})
export class ReceiptModal implements OnInit {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly fb = inject(NonNullableFormBuilder);


  readonly receipt = signal<Receipt | null>(null);
  readonly isEdit = computed(() => this.receipt() !== null);

  readonly statuses = RECEIPT_STATUSES;

  readonly photo = signal<string | null>(null);

  readonly form = this.fb.group({
    tenantName: ['', [Validators.required, Validators.maxLength(80)]],
    period: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    status: ['emitido' as ReceiptStatus, Validators.required],
    issuedDate: ['', Validators.required],
  });

  ngOnInit() {
    const current = this.receipt();
    if (current) {
      this.form.patchValue(current);
      this.photo.set(current.photoUrl ?? null);
    } else {
      const today = new Date().toISOString().slice(0, 10);
      this.form.patchValue({ issuedDate: today, period: today.slice(0, 7) });
    }
  }


  isInvalid(field: 'tenantName' | 'period' | 'amount' | 'issuedDate'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const result: Receipt = {
      id: this.receipt()?.id ?? crypto.randomUUID(),
      ...this.form.getRawValue(),
      hash: this.receipt()?.hash ?? null,
      photoUrl: this.photo(),
    };
    this.activeModal.close(result);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
