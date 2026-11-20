import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { InvoicesPage } from './pages/invoices-page/invoices-page';
import { IncidencesPage } from './pages/incidences-page/incidences-page';
import { TenantsPage } from './pages/tenants-page/tenants-page';
import { NoticesPage } from './pages/notices-page/notices-page';
import { ReceiptsPage } from './pages/receipts-page/receipts-page';
import { FlatSettingsPage } from './pages/flat-settings-page/flat-settings-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { FlatsPage } from './pages/flats-page/flats-page';

export const routes: Routes = [
    { path: '', redirectTo: 'flats', pathMatch: 'full' },
    { path: 'login', component: LoginPage, title: 'Acceso' },
    { path: 'flats', component: FlatsPage, title: 'Mis viviendas' },
    { path: 'flats/:flatId', redirectTo: 'flats/:flatId/dashboard', pathMatch: 'full' },
    { path: 'flats/:flatId/dashboard', component: DashboardPage, title: 'Panel principal' },
    { path: 'flats/:flatId/invoices', component: InvoicesPage, title: 'Facturas' },
    { path: 'flats/:flatId/incidences', component: IncidencesPage, title: 'Incidencias' },
    { path: 'flats/:flatId/tenants', component: TenantsPage, title: 'Inquilinos' },
    { path: 'flats/:flatId/notices', component: NoticesPage, title: 'Comunicados' },
    { path: 'flats/:flatId/receipts', component: ReceiptsPage, title: 'Recibos' },
    { path: 'flats/:flatId/settings', component: FlatSettingsPage, title: 'Ajustes de vivienda' },
    { path: '**', component: NotFoundPage, title: 'Página no encontrada' },
];