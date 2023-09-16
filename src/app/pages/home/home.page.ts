import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { MocksService } from 'src/app/services/mocks.service';
import { List } from '../../interfaces/List';

import { User } from 'src/app/interfaces/User';
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
        this.saveUserInfo(response);
        console.log('Inicio de sesión existoso: ', response);
      })
      .catch(error => {
        console.log('Error al iniciar sesión: ', error);
      });
  }

  signinGoogle() {
    this.authService.loginWithGoogle()
      .then(response => {
        this.saveUserInfo(response);
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

  saveUserInfo(userInfo: any) {
    const authInfo: User = {
      accessToken: userInfo.user.accessToken,
      email: userInfo.user.providerData[0].email,
      emailVerified: userInfo.user.emailVerified,
      name: userInfo.user.providerData[0].displayName,
      phoneNumber: userInfo.user.providerData[0].phoneNumber,
      photoUrl: userInfo.user.providerData[0].photoURL
    }
    this.authService.setUserInfo(authInfo);
  }

}