import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from '../../models/contract';
import { ContractModal } from '../../modals/contract-modal/contract-modal';
import { Flats } from '../../services/flats';

@Component({
  selector: 'app-flat-settings-page',
  styleUrl: './flat-settings-page.css',
  templateUrl: './flat-settings-page.html',
})
export class FlatSettingsPage {
  private readonly flatsService = inject(Flats);
  private readonly modalService = inject(NgbModal);
  readonly flatId = input.required<string>();
  readonly flat = computed(() => this.flatsService.flats().find(f => f.id === this.flatId()));
  readonly flatName = computed(() => this.flat()?.name ?? '');

// Empieza con el código de la vivienda y se puede regenerar en local
readonly accessCode = linkedSignal(() => this.flat()?.code ?? '');

  // Datos de prueba hasta conectar con el servicio
  readonly contract = signal<Contract>({
    id: '1',
    monthlyRent: 900,
    deposit: 900,
    iban: 'ES9121000418450200051332',
    startDate: '2026-09-01',
    endDate: '2027-08-31',
  });


  readonly copied = signal(false);

  openEdit() {
    const ref = this.modalService.open(ContractModal);
    ref.componentInstance.contract.set(this.contract());
    ref.result.then(
      (updated: Contract) => this.contract.set(updated),
      () => {}, // modal cerrado sin guardar
    );
  }

  // IBAN agrupado de 4 en 4 para que se lea mejor
  formatIban(iban: string): string {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  }

  // Solo visual: la API generará y revocará el código real
  generateCode() {
    this.accessCode.set('FLAT-' + Math.floor(1000 + Math.random() * 9000));
    this.copied.set(false);
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.accessCode());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      this.copied.set(false);
    }
  }
}
