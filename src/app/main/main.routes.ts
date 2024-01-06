import { Routes } from '@angular/router';
import { InfoDetailComponent } from './info-detail/info-detail.component';

export const routes: Routes = [
    { 
        path: ':id', 
        component: InfoDetailComponent
    }
];
