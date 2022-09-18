/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Cast, PeliculaDetalle } from '../../interfaces/index';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() identity;
  movie: PeliculaDetalle = {};
  actors: Cast[] = [];
  hiden: number = 150;
  myStar: string = 'star-outline';
  slideOptActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5,
  };
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private ionicStorage: DataLocalService
  ) {}

  /* async  */ ngOnInit() {
    // const exist = await this.ionicStorage.existMovie(this.identity); // First method
    this.ionicStorage
      .existMovie(this.identity)
      .then((exist) => (this.myStar = exist ? 'star' : 'star-outline'));

    this.moviesService.getDetailMovie(this.identity).subscribe((resp) => {
      this.movie = resp;
    });
    this.moviesService.getActors(this.identity).subscribe((resp) => {
      this.actors = resp.cast;
    });
  }

  mReturn() {
    this.modalCtrl.dismiss();
  }

  mFavorite() {
    const response = this.ionicStorage.saveStorage(this.movie);
    this.myStar = response ? 'star' : 'star-outline';
  }
}
