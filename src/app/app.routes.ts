import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { resolveAllInfo, resolveInfoByTopic } from './shared/constants/info-data.resolver';
import { authGuard } from './shared/constants/auth.guard';

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
        loadComponent: () => import('./login/login.component').then(comp => comp.LoginComponent)
    },
    {
        path: 'info-create',
        loadComponent: () => import('./info-create/info-create.component').then(comp => comp.InfoCreateComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
