import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { UnregisteredUserModalComponent } from '../unregistered-user-modal/unregistered-user-modal.component';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
})
export class UserButtonComponent implements OnInit, OnDestroy {

  isAuth: boolean = false;
  userInfo?: User | null;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.getUserInfo.subscribe(response => {
        if (response) {
          this.isAuth = true;
          this.userInfo = response;
        } else {
          this.isAuth = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  async openUnregisteredModal() {
    this.modalService.setIsOpen = true;
    const modal = await this.modalCtrl.create({
      component: UnregisteredUserModalComponent,
      cssClass: 'custom-modal',
      backdropDismiss: true
    });
    return await modal.present();
  }

}
