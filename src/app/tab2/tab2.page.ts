import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Event } from '@angular/router';
import { Movie } from '../interfaces';
import { MoviesService } from '../services/movies.service';
import { DetailsComponent } from '../components/details/details.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  searchText = '';
  movies: Movie[] = [];
  ideas: string[] = ['Angular', 'React', 'Vue', 'Svelte', 'Next'];
  looking = false;

  constructor(
    private moviesService: MoviesService,
    private modalController: ModalController
  ) {}

  onSearchChange(event) {
    const value: string = event.detail.value;

    if (value.length < 1) {
      this.looking = false;
      this.movies = [];
      return;
    }
    this.looking = true;

    this.moviesService.searchMovies(value).subscribe((res) => {
      this.movies = res.results;
      this.looking = false;
    });
  }
  async showDetail(pId: number) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        identity: pId,
      },
    });
    modal.present();
  }
}
