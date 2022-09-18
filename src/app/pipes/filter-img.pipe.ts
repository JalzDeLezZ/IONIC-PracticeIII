/* eslint-disable arrow-body-style */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe_filterImg',
})
export class FilterImgPipe implements PipeTransform {
  transform(aMovies: any[]): any[] {
    return aMovies.filter((pI) => {
      return pI.backdrop_path;
    });
  }
}
