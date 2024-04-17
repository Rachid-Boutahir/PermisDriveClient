import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {UserModel} from "@model/user-model";
import {environment as env} from "@env/environment";


@Injectable({providedIn: 'root'})
export class UserService {

  private readonly path: string = '/user';

  private apiUrl: string = env.baseUrl + env.port + env.apiv1;

  constructor(
    private http: HttpClient
  ) {
  }


  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl + this.path);
  }

  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiUrl + this.path + id);
  }

  addUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl + this.path, user);
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(
      this.apiUrl + this.path + user.userId,
      user
    );
  }

  deleteUser(id: number): Observable<string> {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');

    if (!isConfirmed) {
      return this.http.delete(this.apiUrl + this.path + id, {responseType: 'text'});

    } else {
      return new Observable<string>((observer) => {
        observer.next();
        observer.complete();
      });
    }
  }

}
