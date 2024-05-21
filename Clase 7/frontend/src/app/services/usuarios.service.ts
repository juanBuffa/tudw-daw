import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsuarioDto } from '../dtos/usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private client: HttpClient) {}

  getUsuarios(): Observable<UsuarioDto[]> {
    return this.client.get<UsuarioDto[]>(environment?.apiUrl + '/usuarios');
  }
}
