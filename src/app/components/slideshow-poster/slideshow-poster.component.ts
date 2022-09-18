/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie, PeliculaDetalle } from '../../interfaces/index';
import { DetailsComponent } from '../details/details.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() att_movies: PeliculaDetalle[] = [];
  @Output() refreshList = new EventEmitter<string>();

  slideOpts = {
    slidesPerView: 2.6,
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

    const { data } = await modal.onDidDismiss();
    this.refreshList.emit(data.exist);
  }
}
