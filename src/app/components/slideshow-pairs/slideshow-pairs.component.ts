/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../interfaces/index';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details/details.component';

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

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onClick() {
    this.fun_loadMore.emit();
  }


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
