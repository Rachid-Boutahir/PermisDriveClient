import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {provideRouter} from '@angular/router';
import {FeatherModule} from "angular-feather";
import {allIcons} from "angular-feather/icons";
import {JwtInterceptor} from '@interceptor/jwt.interceptor';
import {ErrorInterceptor} from '@interceptor/error.interceptor';
import {provideAnimations} from "@angular/platform-browser/animations";

import {routes} from './app.routes';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter
    }, {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'YYYY MMM',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY MMM',
        },
      },
    },
    importProvidersFrom(FeatherModule.pick(allIcons)),

  ]
};
