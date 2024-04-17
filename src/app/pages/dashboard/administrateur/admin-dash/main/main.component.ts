import {Component} from '@angular/core';
import {BreadcrumbComponent} from "@shared/components/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: true,
  imports: [
    BreadcrumbComponent,
  ]
})
export class MainComponent {


  breadscrums = [{
    title: 'Dashboad',
    items: [],
    active: 'main',
  }];

  constructor() {
  }

}
