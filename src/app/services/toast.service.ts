import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  async present(
    message: string,
    duration: number,
    position: 'top' | 'bottom' | 'middle',
    color: string
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position,
      color,
    });
    await toast.present();
  }
}
