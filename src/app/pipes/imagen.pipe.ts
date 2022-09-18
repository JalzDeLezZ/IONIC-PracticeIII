import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'pipeImagen',
})

export class ImagenPipe implements PipeTransform {
  transform(img: string, size: string = 'w500'): string {

    if (!img) {
      return './assets/no-image-banner.jpg';
    }

    // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
    const imgUrl = `${URL}/${size}${img}`;

    return imgUrl;
  }
}
