import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BOTTOM_POSITION,
  SHORT_DURATION,
} from 'src/app/constants/app-constant';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilsService } from 'src/app/services/utils.service';
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
    private toastService: ToastService,
    private loadingService: LoadingService,
    private utils: UtilsService
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
    let message;
    if (this.registrationForm.valid) {
      this.loadingService.present();
      const email = this.registrationForm.get('email')?.value;
      const password = this.registrationForm.get('password')?.value;

      this.authService
        .registerWithEmail(email, password)
        .then((res) => {
          message = this.utils.labels.toast_successful_registration;
          this.loadingService.dismiss();
          this.toastService.present(
            message,
            SHORT_DURATION,
            BOTTOM_POSITION,
            'success'
          );
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          message = this.utils.labels.toast_successful_registration;
          this.loadingService.dismiss();
          this.toastService.present(
            message,
            SHORT_DURATION,
            BOTTOM_POSITION,
            'danger'
          );
        });
    } else {
      message = this.utils.labels.toast_invalid_form;
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
