import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private client: HttpClient, private router: Router) {}

  login(nombreUsuario: string, clave: string): Observable<{ token: string }> {
    return this.client.post<{ token: string }>(environment.apiUrl + '/auth', {
      nombreUsuario,
      clave,
    });
  }

  /**
   * 
   * @deprecated
   */
  setSession(token: string) {
    sessionStorage.setItem('token', token);
  }

  /**
   * hola
   */
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !new JwtHelperService().isTokenExpired(token);
  }

  hasRole(rol: RolesEnum): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }

    return new JwtHelperService().decodeToken(token).rol === rol;
  }
}
