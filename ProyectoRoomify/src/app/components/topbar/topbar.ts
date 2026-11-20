import { Component, input, output } from '@angular/core';
import { Flat } from '../../models/flat';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-topbar',
  styleUrl: './topbar.css',
  templateUrl: './topbar.html',
})
export class Topbar {

    // Vivienda activa (null en el panel de viviendas)
  readonly flat = input<Flat | null>(null);

  // El botón de menú solo tiene sentido si hay sidebar
  readonly showMenuButton = input(false);
  
    // Avisa a App para abrir o cerrar la sidebar en pantallas pequeñas
  readonly menuToggle = output<void>();

    // Datos fijos por ahora, luego vendrán del AuthService
  readonly flatName = 'Piso Miño 12';
  readonly userName = 'Propietario';
}
