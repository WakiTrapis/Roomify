import { Component, computed, inject, input } from '@angular/core';
import { Flats } from '../../services/flats';
import { SummaryCard } from '../../components/summary-card/summary-card';
import { DashboardStat } from '../../models/dashboardStat';



@Component({
  imports: [SummaryCard],
  selector: 'app-dashboard-page',
  styleUrl: './dashboard-page.css',
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  private readonly flatsService = inject(Flats);

  // Llega desde la URL gracias a withComponentInputBinding()
  readonly flatId = input.required<string>();

  readonly flat = computed(() => this.flatsService.flats().find(f => f.id === this.flatId()));

  // Cada vivienda muestra sus propios datos
  readonly stats = computed<DashboardStat[]>(() => {
    const f = this.flat();
    if (!f) {
      return [];
    }
    return [
      { title: 'Alquiler mensual', value: `${f.monthlyRent.toFixed(2)} €`, icon: 'bi-cash-stack', color: 'success', hint: 'Total de la vivienda' },
      { title: 'Ocupación', value: `${f.tenantsCount} de ${f.rooms}`, icon: 'bi-people', color: 'primary', hint: `${f.rooms - f.tenantsCount} habitaciones libres` },
      { title: 'Inquilinos morosos', value: `${f.overdueTenants}`, icon: 'bi-exclamation-triangle', color: f.overdueTenants > 0 ? 'danger' : 'success', hint: f.overdueTenants > 0 ? 'Requieren seguimiento' : 'Todo al día' },
      { title: 'Incidencias abiertas', value: `${f.openIncidences}`, icon: 'bi-tools', color: f.openIncidences > 0 ? 'warning' : 'success', hint: f.openIncidences > 0 ? 'Pendientes de resolver' : 'Sin averías' },
    ];
  });
}