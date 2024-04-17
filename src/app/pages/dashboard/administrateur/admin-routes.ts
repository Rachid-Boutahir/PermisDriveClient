import {Route} from "@angular/router";


export const ADMIN_ROUTE: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./admin-dash/admin-dash-routes').then((m) => m.ADMIN_DASH_ROUTE),
  },
  {
    path: 'moniteurs',
    loadChildren: () =>
      import('./moniteurs/admin-moniteur-routes').then((m) => m.ADMIN_MONITEUR_ROUTE),
  },
  {
    path: 'candidats',
    loadChildren: () =>
      import('./candidats/admin-candidat-routes').then((m) => m.ADMIN_CANDIDAT_ROUTE),
  },
  {
    path: 'cours',
    loadChildren: () =>
      import('./cours/admin-cours-routes').then((m) => m.ADMIN_COURS_ROUTE),
  },

];
