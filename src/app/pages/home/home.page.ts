import { Component, OnInit } from '@angular/core';

import { MocksService } from 'src/app/services/mocks.service';
import { AuthService } from 'src/app/services/auth.service';
import { List } from '../../interfaces/List';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mocked: boolean = true;
  lists: List[] = [];

  constructor(
    private mockService: MocksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    if (this.mocked) {
      this.lists = this.mockService.getLists();
    }

  }

  register() {
    this.authService.registerWithEmailAndPassword(environment.loginUser.email, environment.loginUser.password)
      .then(response => {
        console.log('Registro exitoso: ', response);
      })
      .catch(error => {
        console.log('Error al registrarse: ', error);
      });
  }

  signin() {
    this.authService.loginWithEmailAndPassword(environment.loginUser.email, environment.loginUser.password)
      .then(response => {
        console.log('Inicio de sesión existoso: ', response);
      })
      .catch(error => {
        console.log('Error al iniciar sesión: ', error);
      });
  }

  signinGoogle() {
    this.authService.loginWithGoogle()
      .then(response => {
        console.log('Inicio de sesión con Google exitoso: ', response);
      })
      .then(error => {
        console.log('Error al iniciar sesión con Google: ', error);
      });
  }

  logout() {
    this.authService.logout()
      .then(response => {
        console.log('Desconexión existosa');
      })
      .catch(error => {
        console.log('Error en desconexión: ', error);
      });
  }

  checkAuth() {
    this.authService.checkAuthStatus().then(status => {
    });
  }

}