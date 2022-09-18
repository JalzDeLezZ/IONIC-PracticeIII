/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/index';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() att_movies: Movie[] = [];

  slideOpts = {
    slidesPerView: 2.6,
    freeMode: true,
  };

  constructor() {}

  ngOnInit() {}
}
