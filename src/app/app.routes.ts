import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'info/:topic',
        loadComponent: () => import('./main/main.component').then(comp => comp.MainComponent),
        loadChildren: () => import('./main/main.routes').then(route => route.routes)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
