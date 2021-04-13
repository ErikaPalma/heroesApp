import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHeroeComponent } from './views/add-heroe/add-heroe.component';
import { BuscarComponent } from './views/buscar/buscar.component';
import { HeroeDetailComponent } from './views/heroe-detail/heroe-detail.component';
import { HeroesListComponent } from './views/heroes-list/heroes-list.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    /*Todas estas rutas se encuentran dentro del componente Home
    por lo que en ese componente pondremos el router-outlet */
    children: [
      {
        path: 'listado',
        component: HeroesListComponent,
      },
      {
        path: 'agregar',
        component: AddHeroeComponent,
      },
      {
        path: 'editar/:id',
        component: AddHeroeComponent,
      },
      {
        path: 'buscar',
        component: BuscarComponent,
      },
      {
        path: ':id',
        component: HeroeDetailComponent,
      },
      {
        path: '**',
        redirectTo: 'listado',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
