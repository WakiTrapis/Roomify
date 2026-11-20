import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Location } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterOutlet, Sidebar, Topbar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ProyectoRoomify');
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  // URL actual. El valor inicial evita que el layout parpadee al recargar en /login
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects),
    ),
    { initialValue: this.location.path() },
  );

  // El layout (sidebar y topbar) se oculta solo en la pantalla de login
  readonly showLayout = computed(() => !this.currentUrl().startsWith('/login'));

  // Estado del panel lateral en pantallas pequeñas
  readonly sidebarOpen = signal(false);

  toggleSidebar() {
    this.sidebarOpen.update(open => !open);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }
}
