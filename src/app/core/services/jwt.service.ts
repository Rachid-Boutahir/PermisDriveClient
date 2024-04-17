import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class JwtService {

  getToken(): string | null {
    const token = localStorage.getItem('access_token');
    console.log('Retrieved token:', token);
    return token;
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  destroyToken() {
    localStorage.removeItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  saveRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }

  destroyRefreshToken() {
    localStorage.removeItem('refresh_token');
  }
}
