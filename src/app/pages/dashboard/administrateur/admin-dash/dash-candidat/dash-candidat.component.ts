import {Component} from '@angular/core';
import {BreadcrumbComponent} from "@shared/components/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-dash-candidat',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './dash-candidat.component.html',
  styleUrl: './dash-candidat.component.scss'
})
export class DashCandidatComponent {

  breadscrums = [{
    title: 'Dashboad',
    items: [],
    active: 'Candidat',
  }];

  constructor() {
  }
}
