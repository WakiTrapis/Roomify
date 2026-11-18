import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-topbar',
  styleUrl: './topbar.css',
  templateUrl: './topbar.html',
})
export class Topbar {
    // Datos fijos por ahora, luego vendrán del AuthService
  readonly flatName = 'Piso Miño 12';
  readonly userName = 'Propietario';
}
