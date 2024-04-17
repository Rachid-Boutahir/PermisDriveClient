import {Component, OnInit} from '@angular/core';
import {
  Event,
  NavigationEnd,
  NavigationStart, ResolveEnd,
  ResolveStart, RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterModule
} from '@angular/router';
import {CommonModule} from "@angular/common";

import {PageLoaderComponent} from "@layout/page-loader/page-loader.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule, PageLoaderComponent]
})
export class AppComponent implements OnInit {

  title = 'PermisDriveClient';
  currentUrl!: string;
  moduleLoading!: boolean;

  constructor(
    public _router: Router
  ) {
  }

  ngOnInit(): void {
    this._router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof NavigationStart) {
        this.currentUrl = routerEvent.url.substring(routerEvent.url.lastIndexOf('/') + 1);
        console.log('Navigation has started, the url is ', routerEvent.url);
      }
      if (routerEvent instanceof NavigationEnd) {
        console.log('Navigation has ended, the url is ', routerEvent.url);
      }

      if (routerEvent instanceof RouteConfigLoadStart || routerEvent instanceof ResolveStart) {
        this.moduleLoading = true;
      }
      if (routerEvent instanceof RouteConfigLoadEnd || routerEvent instanceof ResolveEnd) {
        this.moduleLoading = false;
      }

      window.scrollTo(0, 0);
    });
  }

}
