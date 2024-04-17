import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpHeaders,
  HttpInterceptor, HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";

import {AuthService} from "@service/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting request:', request);

    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser && currentUser.token.accessToken) {
      const requestCloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token.accessToken}`,
        },
      });
      console.log('Cloned request with accessToken:', requestCloned);
      return next.handle(requestCloned);
    } else {
      return next.handle(request);
    }
  }

}
