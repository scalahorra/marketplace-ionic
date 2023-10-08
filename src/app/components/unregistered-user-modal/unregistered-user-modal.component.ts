import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BOTTOM_POSITION, SHORT_DURATION } from 'src/app/constants/app-constant';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-unregistered-user-modal',
  templateUrl: './unregistered-user-modal.component.html',
  styleUrls: ['./unregistered-user-modal.component.scss'],
})
export class UnregisteredUserModalComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  email: string = '';
  password: string = '';

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.utils.getIsModalOpen.subscribe((isOpen: boolean) => {
        if (!isOpen) {
          this.modalCtrl.dismiss();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  loginWithEmail() {
    this.utils.presentLoading();
    let message;
    this.authService
      .loginWithEmail(this.email, this.password)
      .then((res) => {
        this.utils.dismissLoading();
        this.closeModal();
        message = this.utils.labels.toast_successful_login;
        this.utils.presentToast(message, SHORT_DURATION, BOTTOM_POSITION, 'success');
      })
      .catch((err) => {
        this.utils.dismissLoading();
        message = this.utils.labels.toast_failed_login;
        this.utils.presentToast(message, SHORT_DURATION, BOTTOM_POSITION, 'danger');
      });
  }

  loginWithGoogle() {
    this.utils.presentLoading();
    let message;
    this.authService
      .loginWithGoogle()
      .then((res) => {
        this.utils.dismissLoading();
        this.closeModal();
        message = this.utils.labels.toast_successful_login;
        this.utils.presentToast(message, SHORT_DURATION, BOTTOM_POSITION, 'success');
      })
      .catch((err) => {
        this.utils.dismissLoading();
        message = this.utils.labels.toast_failed_login;
        this.utils.presentToast(message, SHORT_DURATION, BOTTOM_POSITION, 'danger');
      });
  }

  register() {
    this.utils.navigateTo('register');
    this.closeModal();
  }

  closeModal() {
    this.utils.setIsModalOpen = false;
  }
}
