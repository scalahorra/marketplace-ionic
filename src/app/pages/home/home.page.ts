import { Component, OnInit } from '@angular/core';

import { MocksService } from 'src/app/services/mocks.service';
import { AuthService } from 'src/app/services/auth.service';
import { List } from '../../interfaces/List';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mocked: boolean = true;
  lists: List[] = [];
  email: string = 'sergiocalahorra20@gmail.com';
  password: string = '123456';

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
    this.authService.registerWithEmailAndPassword(this.email, this.password)
      .then(response => {
        console.log('Registro exitoso: ', response);
      })
      .catch(error => {
        console.log('Error al registrarse: ', error);
      });
  }

  signin() {
    this.authService.loginWithEmailAndPassword(this.email, this.password)
      .then(response => {
        console.log('Inicio de sesión existoso: ', response);
      })
      .catch(error => {
        console.log('Error al iniciar sesión: ', error);
      })
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

}