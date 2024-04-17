import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, of, tap, throwError} from "rxjs";


import {JwtService} from "@service/jwt.service";
import {UserModel} from "@model/user-model";
import {environment as env} from "@env/environment";
import {PATH_AUTH} from "@config/paths.config";
import {usersExemple} from "@util/fakeUsers";


@Injectable({providedIn: 'root'})
export class AuthService {

  public currentUser: Observable<UserModel>;
  private currentUserSubject: BehaviorSubject<UserModel>;
  private apiUrl: string = env.baseUrl + env.port + env.apiv1;
  private readonly path = PATH_AUTH;

  private usersExemple = usersExemple;

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }


  signIn(credentials: {
    username: string;
    password: string;
    role: string;
  }): Observable<HttpResponse<UserModel>> {
    //TODO : vérifier si user existe dans la base de donnee

    console.log(credentials);
    const usersExemple = this.usersExemple
      .find((u) => {
        return u.username === credentials.username &&
          u.password === credentials.password &&
          u.role === credentials.role;
        }
      );
    console.log(usersExemple);


    const user = this.http.post<HttpResponse<UserModel>>(`${this.apiUrl}${this.path.signin}`, credentials);

    //TODO : CHANGER LA VERIFICATION DE FAKE "usersExemple" AU "user" UNE FOIS LA BASE DE DONNEE EST CONNECTEE.
    if (!usersExemple) {
      return this.error('Username or password is incorrect');
    } else {
      localStorage.setItem('currentUser', JSON.stringify(usersExemple));
      this.currentUserSubject.next(usersExemple);
      return this.ok(usersExemple);
    }
  }

  signUp(user: {
    username: string;
    email: string; password:
      string; role: string
  }): Observable<any> {
    console.log(user);
    return this.http.post(`${this.apiUrl}${this.path.signup}`, user);
  }

  loginUsingToken(): any /*Observable<any>*/ {
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  private ok(body?: UserModel) {
    return of(
      new HttpResponse({
        status: 200, body
      })
    );
  }

  private error(message: string) {
    return throwError(message);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({
      success: false
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.path.forgot_password}`, email);
  }

  resetPassword(password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.path.reset_password}`, password);
  }

  lockedSession(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.path.unlock_session}`, credentials);
  }

  unlockSession(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.path.unlock_session}`, credentials);
  }

}
