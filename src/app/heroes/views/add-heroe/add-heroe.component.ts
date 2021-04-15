import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../model/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    /* como es mismo form para editar o crear, indico que si no incluye esa palabra no haya nada
    si la inlcuye, ejecuta el código */
    if (!this.router.url.includes('editar')) {
      return;
    }
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
        .subscribe((heroe) => this.mostrarSnackbar('Registro actualizado'));
    }
    // si no hay id, creo uno nuevo
    else {
      this.heroesService.addHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes', heroe.id]);
        this.mostrarSnackbar('Registro creado');
      });
    }
  }

  // Borrar héroe
  borrarHeroe(): void {
    //MatDialog
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      // como los obj son pasados por ref no queremos que se modifique ya que el dialog solo debe ser para lectura
      data: { ...this.heroe },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHeroe(this.heroe.id).subscribe((resp) => {
          this.router.navigate(['/heroes']);
          this.mostrarSnackbar('Registro borrado');
        });
      }
    });
  }

  // SnackBar recibe como arg el mensaje que quiero mostrar
  mostrarSnackbar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500,
    });
  }
}
