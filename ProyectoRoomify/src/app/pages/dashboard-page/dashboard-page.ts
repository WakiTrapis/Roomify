import { Component } from '@angular/core';
import { SummaryCard, SummaryColor } from '../../components/summary-card/summary-card';

interface DashboardStat {
  title: string;
  value: string;
  icon: string;
  color: SummaryColor;
  hint?: string;
}

@Component({
  imports: [SummaryCard],
  selector: 'app-dashboard-page',
  styleUrl: './dashboard-page.css',
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  readonly flatName = 'Piso Miño 12';

  // Datos de prueba hasta que la API ofrezca las métricas reales
  readonly stats: DashboardStat[] = [
    { title: 'Recaudado este mes', value: '450,00 €', icon: 'bi-cash-stack', color: 'success', hint: '2 de 4 inquilinos al día' },
    { title: 'Inquilinos morosos', value: '1', icon: 'bi-exclamation-triangle', color: 'danger', hint: 'Pago pendiente de más de 7 días' },
    { title: 'Incidencias abiertas', value: '2', icon: 'bi-tools', color: 'warning', hint: '1 de prioridad alta' },
    { title: 'Próximo cobro', value: '1 abr 2027', icon: 'bi-calendar-event', color: 'primary', hint: 'En 3 días' },
  ];
}
