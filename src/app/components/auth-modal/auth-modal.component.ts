import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    const modalElement = document.querySelector('.modal-container');

    if (modalElement && !modalElement.contains(event.target as Node)) {
      this.modalController.dismiss();
    }
  }

  signinWithGoogle() {
    this.authService.loginWithGoogle()
      .then(response => {
        this.authService.mapUserInfo(response);
        console.log('Sesión iniciada correctamente con Google', response);
      })
      .catch(async error => {
        const alert = await this.alertController.create({
          animated: true,
          buttons: ['OK'],
          header: 'Error',
          message: 'No se ha podido iniciar sesión',
          mode: 'ios'
        });
        await alert.present();
        console.log('Error al iniciar sesión con Google', error);
      });
    this.modalController.dismiss();
  }

  async signinWithEmail() {
    
  }

  close() {
    this.modalController.dismiss();
  }

}
