import { Component, computed, input } from '@angular/core';
import { SummaryColor } from '../../models/dashboardStat';


@Component({
  selector: 'app-summary-card',
  styleUrl: './summary-card.css',
  templateUrl: './summary-card.html',
})
export class SummaryCard {
  readonly title = input.required<string>();
  readonly value = input.required<string>();
  readonly icon = input<string>('bi-info-circle');
  readonly color = input<SummaryColor>('primary');
  readonly hint = input<string>('');

  readonly iconClasses = computed(
    () => `bg-${this.color()}-subtle text-${this.color()}`,
  );
}
