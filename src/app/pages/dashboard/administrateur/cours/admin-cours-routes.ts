import {Route} from "@angular/router";

import {Page404Component} from "@page404/page404.component";
import {AllCoursComponent} from "./all-cours/all-cours.component";
import {AddCoursComponent} from "./add-cours/add-cours.component";
import {EditCoursComponent} from "./edit-cours/edit-cours.component";
import {AboutCoursComponent} from "./about-cours/about-cours.component";

export const ADMIN_COURS_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'all-cours',
    pathMatch: 'full',
  },
  {
    path: 'all-cours',
    component: AllCoursComponent,
  },
  {
    path: 'add-cours',
    component: AddCoursComponent,
  },
  {
    path: 'edit-cours',
    component: EditCoursComponent,
  },
  {
    path: 'about-cours',
    component: AboutCoursComponent,
  }/*,
  {
    path: '**',
    component: Page404Component
  }*/
];
