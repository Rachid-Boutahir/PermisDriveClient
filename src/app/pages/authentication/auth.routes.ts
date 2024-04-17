import {Route} from "@angular/router";

import {SigninComponent} from "@signin/signin.component";
import {Page404Component} from "@page404/page404.component";
import {Page500Component} from "@page500/page500.component";
import {SignupComponent} from "@signup/signup.component";
import {LockedComponent} from "./locked/locked.component";
import {ForgotPasswordComponent} from "@forgot-password/forgot-password.component";


export const AUTH_ROUTE: Route[] = [
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full",
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "page404",
    component: Page404Component,
  },
  {
    path: "page500",
    component: Page500Component,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "locked",
    component: LockedComponent,
  },
  {
    path: '**',
    component: Page404Component
  }
];
