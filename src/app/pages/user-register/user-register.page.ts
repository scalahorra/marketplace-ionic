import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BOTTOM_POSITION,
  SHORT_DURATION,
} from 'src/app/constants/app-constant';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { matchFieldsValidator } from 'src/app/shared/validators/matchFieldsValidator';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registrationForm = this.formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]],
        repeatedEmail: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.minLength(6), Validators.required]],
        repeatedPassword: ['', [Validators.minLength(6), Validators.required]],
      },
      {
        validators: [
          matchFieldsValidator('email', 'repeatedEmail', 'email'),
          matchFieldsValidator('password', 'repeatedPassword', 'password'),
        ],
      }
    );
  }

  ngOnInit() {}

  sendRegistration() {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.get('email')?.value;
      const password = this.registrationForm.get('password')?.value;
      this.authService
        .registerWithEmail(email, password)
        .then((res) => {
          const message = 'Registro existoso';
          this.toastService.present(
            message,
            SHORT_DURATION,
            BOTTOM_POSITION,
            'success'
          );
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          const message = 'Error al registrarse';
          this.toastService.present(
            message,
            SHORT_DURATION,
            BOTTOM_POSITION,
            'danger'
          );
        });
    } else {
      const message = 'Revise los datos introducidos';
      this.toastService.present(
        message,
        SHORT_DURATION,
        BOTTOM_POSITION,
        'danger'
      );
    }
  }

  togglePassword(type: string) {
    if (type === 'normal') {
      this.showPassword = !this.showPassword;
    } else {
      this.showRepeatPassword = !this.showRepeatPassword;
    }
  }
}
