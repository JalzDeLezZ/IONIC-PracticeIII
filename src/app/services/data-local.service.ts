/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  aPeliculas: PeliculaDetalle[] = [];
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.init();
    this.loadOldData();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
    });

    await toast.present();
  }

  saveStorage(pObjectToSave: PeliculaDetalle) {
    let exist = false;
    let message = '';

    for (const pI of this.aPeliculas) {
      if (pI.id === pObjectToSave.id) {
        exist = true;
        break;
      }
    }

    if (!exist) {
      this.aPeliculas.push(pObjectToSave);
      message = 'Pelicula agregada a favoritos';
    } else {
      this.aPeliculas = this.aPeliculas.filter(
        (pII) => pII.id !== pObjectToSave.id
      );
      message = 'Pelicula eliminada de favoritos';
    }

    this.presentToast(message);
    this._storage?.set('movies', this.aPeliculas);

    return !exist;
  }

  async loadOldData() {
    const aOldData = await this._storage.get('movies');
    this.aPeliculas = aOldData || [];
    return this.aPeliculas;
  }

  async existMovie(pId: number) {
    // pId = Number(pId);
    await this.loadOldData();
    const bExist = this.aPeliculas.find((pIII) => pIII.id === pId);

    return bExist ? true : false;
  }
}
