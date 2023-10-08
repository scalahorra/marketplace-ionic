import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  isModalOpen: boolean = false;
  actualPage: string = '';

  routes: any;

  constructor(
    private authService: AuthService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.utils.loadLabels();
    this.routes = this.utils.routes;
    this.authService.checkAuthStatus();
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  subscribe() {
    this.subscriptions.push(
      this.utils.getIsModalOpen.subscribe((isOpen: boolean) => {
        this.isModalOpen = isOpen;
      }),
      this.utils.getActualPage.subscribe((actualPage: string) => {
        this.actualPage = actualPage;
      })
    );
  }

  navigateTo(routeId: string) {
    this.utils.navigateTo(routeId);
  }

  closeModal() {
    this.utils.setIsModalOpen = false;
  }
}
