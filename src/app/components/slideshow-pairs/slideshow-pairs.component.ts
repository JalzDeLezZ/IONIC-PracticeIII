/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../interfaces/index';

@Component({
  selector: 'app-slideshow-pairs',
  templateUrl: './slideshow-pairs.component.html',
  styleUrls: ['./slideshow-pairs.component.scss'],
})
export class SlideshowPairsComponent implements OnInit {
  @Input() att_movies: Movie[] = [];
  @Output() fun_loadMore = new EventEmitter();

  slideOpts = {
    slidesPerView: 2.6,
    freeMode: true,
    spaceBetween: -10,
  };

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.fun_loadMore.emit();
  }
}
