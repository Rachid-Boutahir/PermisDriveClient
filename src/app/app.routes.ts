import {Routes} from '@angular/router';


import {AuthGuard} from "@guard/auth.guard";
import {Page404Component} from "@page404/page404.component";
import {MainLayoutComponent} from "@main-layout/main-layout.component";
import {AuthLayoutComponent} from "@auth-layout/auth-layout.component";


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dash-app-routes').then((m) => m.DASHAPP_ROUTE),
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () => import('./pages/authentication/auth.routes').then((m) => m.AUTH_ROUTE),
  },
  {
    path: '**',
    component: Page404Component
  },
];
