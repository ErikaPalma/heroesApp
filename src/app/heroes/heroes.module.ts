import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

import { AddHeroeComponent } from './views/add-heroe/add-heroe.component';
import { BuscarComponent } from './views/buscar/buscar.component';
import { HeroeDetailComponent } from './views/heroe-detail/heroe-detail.component';
import { HomeComponent } from './views/home/home.component';
import { HeroesListComponent } from './views/heroes-list/heroes-list.component';

@NgModule({
  declarations: [
    AddHeroeComponent,
    BuscarComponent,
    HeroeDetailComponent,
    HomeComponent,
    HeroesListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HeroesRoutingModule,
    FlexLayoutModule,
  ],
})
export class HeroesModule {}
