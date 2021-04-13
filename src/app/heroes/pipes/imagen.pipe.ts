import { ɵBrowserPlatformLocation } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../model/heroe.model';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    return `assets/heroes/${heroe.id}.jpg`;
  }
}
