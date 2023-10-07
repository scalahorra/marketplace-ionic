import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { ModalService } from './services/modal.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  isModalOpen: boolean = false;

  routes: any = [
    { label: 'Home', path: '/home'},
    { label: 'Registro', path: '/register'}
  ];

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.utilsService.loadLabels();
    this.authService.checkAuthStatus();
    this.subscriptions.push(
      this.modalService.getIsOpen.subscribe((isOpen: boolean) => {
        this.isModalOpen = isOpen;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  closeModal() {
    this.modalService.setIsOpen = false;
  }
}
