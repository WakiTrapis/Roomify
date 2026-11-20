import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-topbar',
  styleUrl: './topbar.css',
  templateUrl: './topbar.html',
})
export class Topbar {
    // Avisa a App para abrir o cerrar la sidebar en pantallas pequeñas
  readonly menuToggle = output<void>();

    // Datos fijos por ahora, luego vendrán del AuthService
  readonly flatName = 'Piso Miño 12';
  readonly userName = 'Propietario';
}
