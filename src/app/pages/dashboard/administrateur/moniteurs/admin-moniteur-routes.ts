import {Route} from "@angular/router";

import {Page404Component} from "@page404/page404.component";
import {AllMoniteursComponent} from "./all-moniteurs/all-moniteurs.component";
import {AddMoniteurComponent} from "./add-moniteur/add-moniteur.component";
import {EditMoniteurComponent} from "./edit-moniteur/edit-moniteur.component";
import {AboutMoniteurComponent} from "./about-moniteur/about-moniteur.component";



export const ADMIN_MONITEUR_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'all-moniteurs',
    pathMatch: 'full',
  },
  {
    path: 'all-moniteurs',
    component: AllMoniteursComponent,
  },
  {
    path: 'add-moniteur',
    component: AddMoniteurComponent,
  },
  {
    path: 'edit-moniteur',
    component: EditMoniteurComponent,
  },
  {
    path: 'about-moniteur',
    component: AboutMoniteurComponent,
  }/*,
  {
    path: '**',
    component: Page404Component
  }*/
];
