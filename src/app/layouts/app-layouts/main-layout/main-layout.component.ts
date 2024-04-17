import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "@layout/sidebar/sidebar.component";
import {HeaderComponent} from "@layout/header/header.component";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
  ]
})
export class MainLayoutComponent {

}
