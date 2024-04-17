import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from "@angular/router";

import {AuthService} from "@service/auth.service";


@Injectable({providedIn: 'root'})
export class AuthGuard {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role;

      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {

        this.router.navigate(['/authentication/signin']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/authentication/signin']);
    return false;

  }

}
