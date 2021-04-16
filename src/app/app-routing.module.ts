import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    // Lazy load: indico que cargue los hijos del path 'auth'
    path: 'auth',
    // vienen del auth.module y cuando se carguen en memoria, devuelve las rutas que definí en el AuthModule
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    // lazy load
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  /*  Este componente lo puedo mostrar aquí porque está definido de forma
  global en el app.module, el resto de componentes no (harán lazy load)*/
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
