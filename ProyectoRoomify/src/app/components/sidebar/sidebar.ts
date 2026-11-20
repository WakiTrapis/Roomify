import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
    // Solo se usa en pantallas pequeñas; en escritorio la sidebar siempre está visible
  readonly open = input(false);

  // Avisa a App cuando el usuario pulsa un enlace, para cerrar el panel
  readonly navigate = output<void>();
  
  readonly links = [
    { path: '/flats', label: 'Mis viviendas', icon: 'bi-buildings' },
    { path: '/dashboard', label: 'Inicio', icon: 'bi-house' },
    { path: '/invoices', label: 'Facturas', icon: 'bi-receipt' },
    { path: '/incidences', label: 'Incidencias', icon: 'bi-tools' },
    { path: '/tenants', label: 'Inquilinos', icon: 'bi-people' },
    { path: '/notices', label: 'Comunicados', icon: 'bi-megaphone' },
    { path: '/receipts', label: 'Recibos', icon: 'bi-file-earmark-pdf' },
    { path: '/settings', label: 'Ajustes del piso', icon: 'bi-gear' },
  ];
}
