import {Route} from "@angular/router";


import {Role} from "@model/emuns/role";
// import {AuthGuard} from "@guard/auth.guard";
import {Page404Component} from "@page404/page404.component";


export const DASHAPP_ROUTE: Route[] = [
  // {
  //   path: '',
  //   redirectTo: '/authentication/signin',
  //   pathMatch: 'full'
  // },
  {
    path: 'administrateur',
    // canActivate: [AuthGuard],
    data: {
      role: Role.ADMIN,
    },
    loadChildren: () => import('./administrateur/admin-routes').then((m) => m.ADMIN_ROUTE),
  },
  // {
  //   path: 'moniteur',
  //   // canActivate: [AuthGuard],
  //   data: {
  //     role: Role.MONITEUR,
  //   },
  //   loadChildren: () => import('./moniteur/moniteur-routes').then((m) => m.MONITEUR_ROUTE),
  // },
  // {
  //   path: 'candidat',
  //   //   canActivate: [AuthGuard],
  //   data: {
  //     role: Role.CANDIDAT,
  //   },
  //   loadChildren: () => import('./candidat/candidat-routes').then((m) => m.CANDIDAT_ROUTE),
  // },
  // {
  //   path: '**',
  //   component: Page404Component
  // }
];
