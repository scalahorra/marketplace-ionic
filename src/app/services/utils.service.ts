import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  labels: any;
  private actualPage = new BehaviorSubject<string>('');
  private isModalOpen = new BehaviorSubject<boolean>(false);
  private loadingModal?: HTMLIonLoadingElement;

  routes: any = [
    {
      id: 'home',
      label: 'Home',
      path: '/home',
    },
    {
      id: 'register',
      label: 'Registro',
      path: '/register',
    },
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  loadLabels() {
    this.http.get('assets/labels.json').subscribe((labels) => {
      this.labels = labels;
    });
  }

  navigateTo(routeId: string) {
    const pageData = this.routes.find((route: any) => route.id === routeId);
    this.router.navigate([pageData.path]);
    this.setActualPage = pageData.label;
  }

  get getActualPage() {
    return this.actualPage.asObservable();
  }

  set setActualPage(value: string) {
    this.actualPage.next(value);
  }

  get getIsModalOpen(): Observable<boolean> {
    return this.isModalOpen.asObservable();
  }

  set setIsModalOpen(value: boolean) {
    this.isModalOpen.next(value);
  }

  async presentToast(
    message: string,
    duration: number,
    position: 'top' | 'bottom' | 'middle',
    color: string
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position,
      color,
    });
    await toast.present();
  }

  async presentLoading() {
    this.loadingModal = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await this.loadingModal.present();
  }

  async dismissLoading() {
    if (this.loadingModal) {
      await this.loadingModal.dismiss();
    }
  }
}
