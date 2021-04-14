import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../model/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  // el héroe selecc. puede ser undefined
  heroSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  //Autocomplete
  buscando(): void {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  // Lo que el usuario escribe en el buscador
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    // si no hay valor hago return para que no haga nada más
    if (!event.option.value) {
      // Para que deje de mostrarse la información del héroe una vez que hemos terminado una busqueda válida y vamos a hacer otra
      this.heroSeleccionado = undefined;
      return;
    }
    // si hay valor, extraigo del objeto el valor del heroe
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    // hago una petición http para extraer la info del héroe
    this.heroesService
      .getHeroeId(heroe.id)
      .subscribe((heroe) => (this.heroSeleccionado = heroe));
  }
}
