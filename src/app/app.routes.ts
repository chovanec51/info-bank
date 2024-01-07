import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { resolveAllInfo, resolveInfoByTopic } from './shared/constants/info-data.resolver';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        resolve: [resolveAllInfo]
    },
    {
        path: 'info/:topic',
        loadComponent: () => import('./main/main.component').then(comp => comp.MainComponent),
        loadChildren: () => import('./main/main.routes').then(route => route.routes),
        resolve: [resolveInfoByTopic]
    },
    {
        path: 'login',
        redirectTo: 'info-create'
    },
    {
        path: 'info-create',
        loadComponent: () => import('./info-create/info-create.component').then(comp => comp.InfoCreateComponent)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
