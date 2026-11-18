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

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginPage, title: 'Acceso' },
    { path: 'dashboard', component: DashboardPage, title: 'Panel principal' },
    { path: 'invoices', component: InvoicesPage, title: 'Facturas' },
    { path: 'incidences', component: IncidencesPage, title: 'Incidencias' },
    { path: 'tenants', component: TenantsPage, title: 'Inquilinos' },
    { path: 'notices', component: NoticesPage, title: 'Comunicados' },
    { path: 'receipts', component: ReceiptsPage, title: 'Recibos' },
    { path: 'settings', component: FlatSettingsPage, title: 'Ajustes de vivienda' },
    { path: '**', component: NotFoundPage, title: 'Página no encontrada' },
];