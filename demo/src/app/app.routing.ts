import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GettingStarted } from './getting-started';
import { HomeComponent } from './home/home.component';

import {
  NgbdPivot
} from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'getting-started', component: GettingStarted },
  { path: 'components', redirectTo: 'components/pivot' },
  { path: 'components/pivot', component: NgbdPivot }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
