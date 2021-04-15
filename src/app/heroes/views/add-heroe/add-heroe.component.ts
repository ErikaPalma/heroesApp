import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../model/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-heroe',
  templateUrl: './add-heroe.component.html',
  styleUrls: ['./add-heroe.component.scss'],
})
export class AddHeroeComponent implements OnInit {
  // Estos id se ponen tal cual estén en la BD
  creadores = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];
  // Creo el objeto y lo inicializo vacío
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    // Se pone por defecto en alguna de las 2 opciones
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  // Guardar un nuevo héroe
  guardar(): void {
    // si viene vacío no hace nada
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    // si ya hay id, actualizo
    if (this.heroe.id) {
      this.heroesService
        .updateHeroe(this.heroe)
        .subscribe((heroe) => console.log('Actualizando', heroe));
    }
    // si no hay id, creo uno nuevo
    else {
      this.heroesService.addHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes', heroe.id]);
      });
    }
  }
}
