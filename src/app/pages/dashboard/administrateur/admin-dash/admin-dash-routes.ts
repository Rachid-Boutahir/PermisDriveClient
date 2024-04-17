import {Route} from "@angular/router";

import {Page404Component} from "@page404/page404.component";
import {MainComponent} from "./main/main.component";
import {DashMoniteurComponent} from "./dash-moniteur/dash-moniteur.component";
import {DashCandidatComponent} from "./dash-candidat/dash-candidat.component";


export const ADMIN_DASH_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'dash-moniteur',
    component: DashMoniteurComponent,
  },
  {
    path: 'dash-candidat',
    component: DashCandidatComponent,
  }/*,
  {
    path: '**',
    component: Page404Component
  }*/
];
