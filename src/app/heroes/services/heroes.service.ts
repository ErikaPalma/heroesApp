import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../model/heroe.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/heroes';

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(this.url);
  }

  getHeroeId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.url}/${id}`);
  }
}
