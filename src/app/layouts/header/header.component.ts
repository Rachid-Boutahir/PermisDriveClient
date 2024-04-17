import {Component, Inject, Renderer2} from '@angular/core';
import {DOCUMENT, NgClass, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from "@angular/material/menu";
import {FeatherIconsComponent} from "@components/feather-icons.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    MatButtonModule,
    MatMenuModule,
    FeatherIconsComponent,
    NgOptimizedImage
  ]
})
export class HeaderComponent {

  isNavbarCollapsed = true;
  userImg?: string;
  //TODO: Verfier le lien d'URL homePage
  homePage?: string = 'admin/dashboard';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
  }

  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }

}
