import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth() {
    return { ...this._auth };
  }

  constructor(private http: HttpClient) {}

  verificarAutenticacion(): Observable<boolean> {
    // si no hay ningún token almacenado no le doy acceso
    if (!localStorage.getItem('id')) {
      return of(false);
    }
    // si hay token hay que volver a hacer la petición
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      // si tiene valor, devuelvo true
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      //le paso el id que viene del auth.id
      tap((auth) => localStorage.setItem('id', auth.id))
    );
  }

  logout() {
    this._auth = undefined;
  }
}
