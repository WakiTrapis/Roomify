import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FLAT_MODES, Flat } from '../../models/flat';

@Component({
  imports: [RouterLink],
  selector: 'app-flat-card',
  styleUrl: './flat-card.css',
  templateUrl: './flat-card.html',
})
export class FlatCard {
  readonly flat = input.required<Flat>();

  readonly edit = output<Flat>();
  readonly remove = output<Flat>();

  readonly modeLabel = computed(
    () => FLAT_MODES.find(m => m.value === this.flat().mode)?.label ?? '',
  );

  readonly modeBadge = computed(
    () => FLAT_MODES.find(m => m.value === this.flat().mode)?.badge ?? 'text-bg-secondary',
  );
}