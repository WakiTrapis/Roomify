import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NOTICE_TYPES, Notice, NoticeType } from '../../models/notice';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-notice-modal',
  styleUrl: './notice-modal.css',
  templateUrl: './notice-modal.html',
})
export class NoticeModal implements OnInit {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly fb = inject(NonNullableFormBuilder);

  // null = alta nueva; con datos = edición. Lo rellena la page.
  readonly notice = signal<Notice | null>(null);
  readonly isEdit = computed(() => this.notice() !== null);

  readonly types = NOTICE_TYPES;

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(80)]],
    content: ['', [Validators.required, Validators.maxLength(600)]],
    type: ['comunicado' as NoticeType, Validators.required],
    date: ['', Validators.required],
  });

  ngOnInit() {
    const current = this.notice();
    if (current) {
      this.form.patchValue(current);
    } else {
      this.form.patchValue({ date: new Date().toISOString().slice(0, 10) });
    }
  }

  isInvalid(field: 'title' | 'content' | 'date'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const result: Notice = {
      id: this.notice()?.id ?? crypto.randomUUID(),
      ...this.form.getRawValue(),
    };
    this.activeModal.close(result);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}