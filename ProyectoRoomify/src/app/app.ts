import { Component, computed, effect, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';
import { Flats } from './services/flats';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Topbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly flatsService = inject(Flats);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects),
    ),
    { initialValue: this.location.path() },
  );

  readonly isLogin = computed(() => this.currentUrl().startsWith('/login'));

  // Id de la vivienda activa, sacado de la URL (/flats/:flatId/...)
  readonly flatId = computed(
    () => /^\/flats\/([^/?#]+)/.exec(this.currentUrl())?.[1] ?? null,
  );

  readonly currentFlat = computed(() => {
    const id = this.flatId();
    return id ? (this.flatsService.flats().find(f => f.id === id) ?? null) : null;
  });

  readonly sidebarOpen = signal(false);

  constructor() {
    // Si la URL apunta a una vivienda que no existe, volvemos al panel de viviendas
    effect(() => {
      if (this.flatId() && !this.currentFlat()) {
        this.router.navigateByUrl('/flats');
      }
    });

    // Al salir de una vivienda, el panel lateral se queda cerrado
    effect(() => {
      if (!this.flatId()) {
        this.sidebarOpen.set(false);
      }
    });
  }

  toggleSidebar() {
    this.sidebarOpen.update(open => !open);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }
}