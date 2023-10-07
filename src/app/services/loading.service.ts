import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading?: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController) { }

  async present() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  async dismiss() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
