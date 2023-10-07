import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BOTTOM_POSITION, SHORT_DURATION } from 'src/app/constants/app-constant';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';

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
    private router: Router,
    private loadingService: LoadingService,
    private toastService: ToastService
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
        message = 'Sesión iniciada';
        this.toastService.present(message, SHORT_DURATION, BOTTOM_POSITION, 'success');
      })
      .catch((err) => {
        this.loadingService.dismiss();
        message = 'Ha ocurrido un error';
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
        message = 'Sesión iniciada';
        this.toastService.present(message, SHORT_DURATION, BOTTOM_POSITION, 'success');
      })
      .catch((err) => {
        this.loadingService.dismiss();
        message = 'Ha ocurrido un error';
        this.toastService.present(message, SHORT_DURATION, BOTTOM_POSITION, 'danger');
      });
  }

  register() {
    this.router.navigate(['/register']);
    this.closeModal();
  }

  closeModal() {
    this.modalService.setIsOpen = false;
  }
}
