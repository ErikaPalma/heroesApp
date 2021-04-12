import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHeroeComponent } from './views/add-heroe/add-heroe.component';
import { BuscarComponent } from './views/buscar/buscar.component';
import { HeroeDetailComponent } from './views/heroe-detail/heroe-detail.component';
import { HomeComponent } from './views/home/home.component';
import { HeroesListComponent } from './views/heroes-list/heroes-list.component';

@NgModule({
  declarations: [AddHeroeComponent, BuscarComponent, HeroeDetailComponent, HomeComponent, HeroesListComponent],
  imports: [CommonModule],
})
export class HeroesModule {}
