import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../model/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit {
  constructor(private heroesService: HeroesService) {}
  heroes: Heroe[];

  ngOnInit(): void {
    // heroes es el contenido del observable que es un array de héroes
    this.heroesService
      .getHeroes()
      // me suscribo para recibir la petición
      .subscribe((heroes) => {
        // para comprobar si el array tiene contenido, si es null no hace nada
        if (heroes?.length) {
          this.heroes = heroes;
        }
      });
  }
}
