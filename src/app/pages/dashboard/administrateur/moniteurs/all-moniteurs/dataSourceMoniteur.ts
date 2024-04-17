import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {MoniteursModel} from "@model/moniteurs.model";
import {BehaviorSubject, map, merge, Observable} from "rxjs";
import {MoniteurService} from "@service/moniteur.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {formatDate} from "@angular/common";


export class DataSourceMoniteur extends DataSource<MoniteursModel> {

  filterChange = new BehaviorSubject('');

  filteredData: MoniteursModel[] = [];
  renderedData: MoniteursModel[] = [];

  constructor(
    public moniteurDatabase: MoniteurService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (
      this.paginator.pageIndex = 0
    ));

  }

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  connect(collectionViewer: CollectionViewer): Observable<MoniteursModel[]> {

    const displayDataChanges = [
      this.moniteurDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];
    this.moniteurDatabase.getAllMoniteurs();

    return merge(...displayDataChanges).pipe(
      map(() => {
          this.filteredData = this.moniteurDatabase.data
            .slice()
            .filter((moniteur: MoniteursModel) => {
              const searchStr = (
                moniteur.moniteurId +
                moniteur.nom + moniteur.prenom +
                moniteur.sexe + moniteur.photo +
                moniteur.telephone + moniteur.ville +
                moniteur.adresse + moniteur.typeMoniteur +
                formatDate(moniteur.dateJointures, 'yyyy-MM-dd', 'en') +
                formatDate(moniteur.dateNaissance, 'yyyy-MM-dd', 'en')
              ).toLowerCase();
              return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
          const sortedData = this.sortData(this.filteredData.slice());
          const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
          this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);
          return this.renderedData;
        }
      )
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  private sortData(moniteurData: MoniteursModel[]): MoniteursModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return moniteurData;
    }
    return moniteurData.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'moniteurId':
          [propertyA, propertyB] = [a.moniteurId, b.moniteurId];
          break;
        case 'nom':
          [propertyA, propertyB] = [a.nom, b.nom];
          break;
        case 'prenom':
          [propertyA, propertyB] = [a.prenom, b.prenom];
          break;
        case 'sexe':
          [propertyA, propertyB] = [a.sexe, b.sexe];
          break;
        case 'dateNaissance':
          [propertyA, propertyB] = [a.dateNaissance, b.dateNaissance];
          break;
        case 'photo':
          [propertyA, propertyB] = [a.photo, b.photo];
          break;
        case 'telephone':
          [propertyA, propertyB] = [a.telephone, b.telephone];
          break;
        case 'ville':
          [propertyA, propertyB] = [a.ville, b.ville];
          break;
        case 'adresse':
          [propertyA, propertyB] = [a.adresse, b.adresse];
          break;
        case 'typeMoniteur':
          [propertyA, propertyB] = [a.typeMoniteur, b.typeMoniteur];
          break;
        case 'dateJointures':
          [propertyA, propertyB] = [a.dateJointures, b.dateJointures];
          break;
        case 'salaire':
          [propertyA, propertyB] = [a.salaire, b.salaire];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
