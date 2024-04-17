import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

import {environment as env} from "@env/environment";
import {UnsubscribeOnDestroyAdapter} from "@shared/UnsubscribeOnDestroyAdapter";
import {MoniteursModel} from "@model/moniteurs.model";
import {COMMA} from "@angular/cdk/keycodes";

@Injectable({providedIn: 'root'})
export class MoniteurService extends UnsubscribeOnDestroyAdapter {

  // private readonly path: string = '/moniteur/';
  private readonly apiUrl: string = env.baseUrl + env.port + env.apiv1 + '/moniteur/';

  private readonly fakeDataAPI = 'assets/data/moniteurs.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<MoniteursModel[]> = new BehaviorSubject<MoniteursModel[]>([]);
  dialogData!: MoniteursModel;


  constructor(
    private http: HttpClient
  ) {
    super();
  }

  get data(): MoniteursModel[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  // CRUD
  getAllMoniteurs(): void {

    let url;
    if (this.fakeDataAPI && this.fakeDataAPI.trim() !== '') {
      url = this.fakeDataAPI;
    } else {
      url = this.apiUrl;
    }
    this.subs.sink = this.http.get<MoniteursModel[]>(url).subscribe(
      {
        next: (data: MoniteursModel[]) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      }
    );
    //return this.http.get<MoniteursModel[]>(this.apiUrl + this.path);
  }

  getMoniteur(id: number): void {
    this.http.get<MoniteursModel>(this.apiUrl + id);
  }

  addMoniteur(moniteur: MoniteursModel): void {
    console.log(moniteur)
    this.http.post(this.apiUrl, moniteur).subscribe(
      () => {
        this.dialogData = moniteur;
      },
      error => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  deleteMoniteur(id: number): void {
    console.log(id);
    this.http.delete<void>(this.apiUrl + id, {responseType: 'text' as 'json'})
      .subscribe(
        {
          next: (data) => {
            console.log('Deleted ', id);
          },
          error(error: HttpErrorResponse) {
            console.log(error.name + ' ' + error.message);
          }
        }
      );
  }

  updateMoniteur(moniteur: MoniteursModel): Observable<MoniteursModel> {
    console.log(moniteur);
    this.http.put(this.apiUrl + moniteur.moniteurId, moniteur).subscribe(
    )

    return this.http.put<MoniteursModel>(
      this.apiUrl + moniteur.moniteurId,
      moniteur
    );
  }
}
