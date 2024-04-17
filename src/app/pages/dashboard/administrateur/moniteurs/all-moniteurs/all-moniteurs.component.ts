import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule, MatMiniFabButton} from "@angular/material/button";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTabsModule} from "@angular/material/tabs";
import {DatePipe, NgClass} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRippleModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {fromEvent} from "rxjs";

import {DataSourceMoniteur} from "./dataSourceMoniteur";
import {MoniteursModel} from "@model/moniteurs.model";
import {MoniteurService} from "@service/moniteur.service";
import {TableElement} from "@shared/TableElement";
import {TableExportUtil} from "@shared/tableExportUtil";
import {UnsubscribeOnDestroyAdapter} from "@shared/UnsubscribeOnDestroyAdapter";
import {BreadcrumbComponent} from "@shared/components/breadcrumb/breadcrumb.component";
import {FormDialogComponent} from "./dialogs/form-dialog/form-dialog.component";
import {FeatherIconsComponent} from "@components/feather-icons.component";
import {DeleteDialogComponent} from './dialogs/delete/delete.component';


@Component({
  selector: 'app-all-moniteurs',
  templateUrl: './all-moniteurs.component.html',
  styleUrl: './all-moniteurs.component.scss',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatSort,
    MatTable,
    MatIcon,
    MatMiniFabButton,
    MatTooltip,
    MatTabsModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatCheckboxModule,
    FeatherIconsComponent,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatPaginatorModule,
    DatePipe,
  ]
})
export class AllMoniteursComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  id?: number | string;
  displayedColumns: string[] = [
    'moniteurId','photo', 'nom', 'prenom','email', 'sexe',
    // , 'telephone',
    'ville', 'adresse','dateJointures',
    'dateNaissance',/*'typeMoniteur','salaire'*/
    'actions'
  ];
  moniteurDatabaseService?: MoniteurService;
  dataSource!: DataSourceMoniteur;
  selection = new SelectionModel<MoniteursModel>(true, []);
  moniteurs?: MoniteursModel;
  breadscrums = [{
    title: 'Administareurs',
    items: ['Moniteurs'],
    active: 'Tous les Moniteurs',
  }];

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort!: MatSort;

  @ViewChild('filter', {static: true})
  filter!: ElementRef;

  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;

  contextMenuPosition = {x: '0px', y: '0px'};

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public moniteurService: MoniteurService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  private loadData() {
    // this.
    this.moniteurDatabaseService = new MoniteurService(this.httpClient);
    this.dataSource = new DataSourceMoniteur(
      this.moniteurDatabaseService,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        moniteur: this.moniteurs,
        action: 'add',
      }
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.moniteurDatabaseService?.dataChange.value.unshift(
          this.moniteurService.getDialogData()
        )
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  editCall(row: MoniteursModel) {
    this.id = row.moniteurId;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        moniteur: row,
        action: 'edit',
      }
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.moniteurDatabaseService?.dataChange.value.findIndex(
          (x) => x.moniteurId === this.id
        );
        if (foundIndex != null && this.moniteurDatabaseService) {
          this.moniteurDatabaseService.dataChange.value[foundIndex] = this.moniteurService.getDialogData();
          this.refreshTable();
          this.showNotification(
            'black',
            'Edit Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }

  deleteItem(row: MoniteursModel) {
    this.id = row.moniteurId;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.moniteurDatabaseService?.dataChange.value.findIndex(
          (x) => x.moniteurId === this.id
        );
        if (foundIndex != null && this.moniteurDatabaseService) {
          this.moniteurDatabaseService.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
          this.showNotification(
            'snackbar-danger',
            'Delete Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });

  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach(row =>
        this.selection.select(row)
      );
  }

  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      this.moniteurDatabaseService?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<MoniteursModel>(true, []);
    })
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }

  exportExcel() {
    const exportData: Partial<TableElement>[] = this.dataSource.filteredData.map((x) => ({
        'ID': x.moniteurId,
        'Nom': x.nom,
        'Prenom': x.prenom,
        'Sexe': x.sexe,
        'Email': x.email,
        'Telephone': x.telephone,
        'Ville': x.ville,
        'Adresse': x.adresse,
        'Type Moniteur': x.typeMoniteur,
        'Date Jointures': x.dateJointures,
        'Salaire': x.salaire,
        'Date Naissance': x.dateNaissance || '',
      })
    );
    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  private showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onContextMenu(event: MouseEvent, item: MoniteursModel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = {item: item};
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}
