import {Component, ElementRef, HostListener, Inject, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {DOCUMENT, NgClass, NgOptimizedImage} from "@angular/common";
import {NgScrollbar} from "ngx-scrollbar";

import {ROUTES} from './sidebar-items';
import {RouteInfo} from "./sidebar.metadata";
import {AuthService} from "@service/auth.service";
import {Role} from "@model/emuns/role";
import {UnsubscribeOnDestroyAdapter} from "@shared/UnsubscribeOnDestroyAdapter";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [
    NgScrollbar,
    RouterLinkActive,
    RouterLink,
    NgClass,
    NgOptimizedImage,
  ]
})
export class SidebarComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  public sidebarItems!: RouteInfo[];
  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  listMaxHeight?: string;
  userFullName?: string;
  userImg?: string;
  userType?: string;
  headerHeight = 60;
  listMaxWidth?: string;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    super();
    this.elementRef.nativeElement.closest('body');
    this.subs.sink = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }

  callToggleMenu($event: Event, length: number) {
    if (length > 0) {
      const parentElement = ($event.target as HTMLInputElement).closest('li');
      const activeClass = parentElement?.classList.contains('active');

      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }

  ngOnInit(): void {

    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role;
      this.userFullName = this.authService.currentUserValue.firstName + ' ' + this.authService.currentUserValue.lastName;
      this.userImg = this.authService.currentUserValue.img || "assets/images/user/admin.jpg";
      this.sidebarItems = ROUTES.filter(
        (routeElement) => {
          return routeElement.role.indexOf(userRole) !== -1 || routeElement.role.indexOf('Admin') !== -1;
        }
      );
      if (userRole === Role.ADMIN) {
        this.userType = Role.ADMIN;
      } else if (userRole === Role.MONITEUR) {
        this.userType = Role.MONITEUR;
      } else if (userRole === Role.CANDIDAT) {
        this.userType = Role.CANDIDAT;
      } else {
        this.userType = Role.ADMIN;
      }
    }

    this.initLeftSidebar();
    this.bodyTag = this.document.body;

  }

  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }

  private setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }

  private isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }

  private checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1025) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }

  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }

  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }

  logout() {
    //TODO: AJOUTER LOUGOUT IMPLEMENTATION


    // this.subs.sink = this.authService.logout().subscribe((res) => {
    //   if (!res.success) {
    //     this.router.navigate(['/authentication/signin']);
    //   }
    // });
  }

}
