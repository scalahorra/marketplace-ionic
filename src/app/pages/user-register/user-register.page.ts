import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private router: Router
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
      this.authService.registerWithEmail(email, password)
        .then(res => {
          console.log('REGISTRO EXISTOSO', res);
          this.router.navigate(['/home']);
        })
        .catch(err => {
          console.log('FALLO REGISTRO', err);
        });
    } else {
      console.log('Formulario inválido', this.registrationForm);
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
