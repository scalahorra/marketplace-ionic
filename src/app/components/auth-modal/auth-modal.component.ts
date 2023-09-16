import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent  implements OnInit {

  constructor( private modalController: ModalController ) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

}
