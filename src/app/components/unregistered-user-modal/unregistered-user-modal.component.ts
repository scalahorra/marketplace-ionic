import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BOTTOM_POSITION, SHORT_DURATION } from 'src/app/constants/app-constant';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';
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
    private modalService: ModalService,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.modalService.getIsOpen.subscribe((isOpen: boolean) => {
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
    this.loadingService.present();
    let message;
    this.authService
      .loginWithEmail(this.email, this.password)
      .then((res) => {
        this.loadingService.dismiss();
        this.closeModal();
        message = this.utils.labels.toast_successful_login;
        this.toastService.present(message, SHORT_DURATION, BOTTOM_POSITION, 'success');
      })
      .catch((err) => {
        this.loadingService.dismiss();
        message = this.utils.labels.toast_failed_login;
        this.toastService.present(message, SHORT_DURATION, BOTTOM_POSITION, 'danger');
      });
  }

  loginWithGoogle() {
    this.loadingService.present();
    let message;
    this.authService
      .loginWithGoogle()
      .then((res) => {
        this.loadingService.dismiss();
        this.closeModal();
        message = this.utils.labels.toast_successful_login;
        this.toastService.present(message, SHORT_DURATION, BOTTOM_POSITION, 'success');
      })
      .catch((err) => {
        this.loadingService.dismiss();
        message = this.utils.labels.toast_failed_login;
        this.toastService.present(message, SHORT_DURATION, BOTTOM_POSITION, 'danger');
      });
  }

  register() {
    this.utils.navigateTo('register');
    this.closeModal();
  }

  closeModal() {
    this.modalService.setIsOpen = false;
  }
}
