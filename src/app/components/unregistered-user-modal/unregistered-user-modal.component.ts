import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-unregistered-user-modal',
  templateUrl: './unregistered-user-modal.component.html',
  styleUrls: ['./unregistered-user-modal.component.scss'],
})
export class UnregisteredUserModalComponent  implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private modalService: ModalService,
    private modalCtrl: ModalController,
    private authService: AuthService
  ) { }

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
    this.isLoading = true;
    this.authService.loginWithEmail(this.email, this.password)
      .then(res => {
        this.successfulLogin(res);
      })
      .catch(err => {
        this.isLoading = false;
      });
  }

  loginWithGoogle() {
    this.isLoading = true;
    this.authService.loginWithGoogle()
      .then(res => {
        this.closeModal();
      })
      .catch(err => {
        this.isLoading = false;
      });
  }

  register() {}

  successfulLogin(response: any) {
    this.closeModal();
  }

  closeModal() {
    this.modalService.setIsOpen = false;
  }

}
