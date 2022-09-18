import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FilterImgPipe } from './filter-img.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    FilterImgPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    FilterImgPipe
  ]
})
export class PipesModule { }
