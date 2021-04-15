import { ɵBrowserPlatformLocation } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../model/heroe.model';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  // recibe el heroe como arg, toma el id y le concatena el .jpg
  transform(heroe: Heroe): string {
    // si el id o el path de la img no existe le asigno esta imagen
    if (!heroe.id && !heroe.alt_img) {
      return 'assets/no-image.png';
    } else if (heroe.alt_img) {
      /* si le añado la url en el form de editar o crear, el heroe tiene la propiedad alt_img en su objeto, 
    pero no muestra la imagen. Si existe esa propiedad, retorno todo el path para que se muestre la imagen */
      return heroe.alt_img;
    } else {
      return `assets/heroes/${heroe.id}.jpg`;
    }
  }
}
