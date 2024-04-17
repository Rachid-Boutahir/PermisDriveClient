import {Route} from "@angular/router";

import {Page404Component} from "@page404/page404.component";
import {AllCandidatComponent} from "./all-candidat/all-candidat.component";
import {AddCandidatComponent} from "./add-candidat/add-candidat.component";
import {EditCandidatComponent} from "./edit-candidat/edit-candidat.component";
import {AboutCandidatComponent} from "./about-candidat/about-candidat.component";


export const ADMIN_CANDIDAT_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'all-canidats',
    pathMatch: 'full',
  },
  {
    path: 'all-canidats',
    component: AllCandidatComponent,
  },
  {
    path: 'add-canidat',
    component: AddCandidatComponent,
  },
  {
    path: 'edit-canidat',
    component: EditCandidatComponent,
  },
  {
    path: 'about-canidat',
    component: AboutCandidatComponent,
  }/*,
  {
    path: '**',
    component: Page404Component
  }*/
];
