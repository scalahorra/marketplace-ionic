import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  labels: any;
  private actualPage = new BehaviorSubject<string>('');

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

  constructor(private http: HttpClient, private router: Router) {}

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
}
