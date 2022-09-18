/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {
  @Input() att_movies: Movie[] = [];

  slideOpts = {
    slidesPerView: 1.3,
    freeMode: true,
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async showDetail(pId: number) {
    const modal = await this.modalCtrl.create({
      component: DetailsComponent,
      componentProps: {
        identity: pId,
      },
    });
    modal.present();
  }
}
