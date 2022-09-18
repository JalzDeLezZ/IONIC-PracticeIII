/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-body-style */
import { Genre } from './../interfaces/index';
import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { PeliculaDetalle, Movie } from '../interfaces/index';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  aMovies: PeliculaDetalle[] = [];
  genres: Genre[] = [];
  aFavoritesPerGenre: any[] = []; /*{ genre: 'Action', movies: [] }*/

  constructor(
    private ionicStorage: DataLocalService,
    private movieService: MoviesService
  ) {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    this.aMovies = await this.ionicStorage.loadOldData();
    this.genres = await this.movieService.uploadGenres();
    this.mMoviesPerGenre(this.genres, this.aMovies);
  }

  mMoviesPerGenre(genres: Genre[], movies: PeliculaDetalle[]) {
    this.aFavoritesPerGenre = [];
    genres.forEach((pONE) => {
      this.aFavoritesPerGenre.push({
        genre: pONE.name,
        movies: movies.filter((pTWO) => {
          return pTWO.genres.find((pTHREE) => pTHREE.id === pONE.id);
        }),
      });
    });
    console.log(this.aFavoritesPerGenre);
  }

  async dadFun_refreshList(event) {
    if (!event) {
      this.aMovies = await this.ionicStorage.loadOldData();
      this.genres = await this.movieService.uploadGenres();
      this.mMoviesPerGenre(this.genres, this.aMovies);
    }
  }
}
