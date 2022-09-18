import { Component, OnInit } from '@angular/core';
import { ResponseMDB } from '../interfaces';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  peliculasRecientes: Movie[] = [];
  famousBillboard: Movie[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getFeature().subscribe((resp) => {
      this.peliculasRecientes = resp.results;
    });
    this.getPopulars();
  }

  mLoadMore() {
    this.getPopulars();
  }

  getPopulars() {
    this.movieService.getNotorious().subscribe((resp) => {
      const aTemp = [...this.famousBillboard, ...resp.results];
      this.famousBillboard = aTemp;
    });
  }
}
