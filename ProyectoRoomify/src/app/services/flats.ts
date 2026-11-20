import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Flat } from '../models/flat';

@Service()
export class Flats {
private readonly http = inject(HttpClient);

  // Datos mock compartidos por la page, la topbar y el dashboard.
  // Se sustituirán por la petición a la API cuando estén los endpoints.
readonly flats = signal<Flat[]>([
    {
    id: '1',
    name: 'Piso Miño 12',
    address: 'C/ Pagés del Corro 45, 2ºB, Sevilla',
    code: 'FLAT-8821',
    rooms: 4,
    tenantsCount: 4,
    monthlyRent: 900,
    mode: 'vinculado',
    openIncidences: 2,
    overdueTenants: 1,
    },
    {
    id: '2',
    name: 'Ático Betis',
    address: 'C/ Betis 18, ático, Sevilla',
    code: 'FLAT-3304',
    rooms: 3,
    tenantsCount: 2,
    monthlyRent: 720,
    mode: 'autogestionado',
    openIncidences: 0,
    overdueTenants: 0,
    },
    {
    id: '3',
    name: 'Casa Palmera',
    address: 'Av. de la Palmera 7, 1ºA, Sevilla',
    code: 'FLAT-5517',
    rooms: 5,
    tenantsCount: 3,
    monthlyRent: 1100,
    mode: 'autogestionado',
    openIncidences: 1,
    overdueTenants: 2,
    },
]);

  // Los métodos se añadirán cuando estén definidos los endpoints de la API
}