import { Component } from '@angular/core';
import {BreadcrumbComponent} from "@shared/components/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-dash-moniteur',
  templateUrl: './dash-moniteur.component.html',
  styleUrl: './dash-moniteur.component.scss',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ]
})
export class DashMoniteurComponent {


  breadscrums = [{
    title: 'Dashboad',
    items: [],
    active: 'Moniteur',
  }];
  constructor() {
  }

}
