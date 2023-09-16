import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent  implements OnInit, OnDestroy {

  isAuth: boolean = false;
  userInfo?: User | null;
  private subscriptions: Subscription[] = [];

  constructor( private authService: AuthService, private modalController: ModalController ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.getAuthStatus().subscribe(response => {
        this.isAuth = response ? true : false;
      }),
      this.authService.getUserInfo().subscribe(response => {
        this.userInfo = response;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
