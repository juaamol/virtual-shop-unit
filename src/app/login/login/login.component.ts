import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.formValue('email');
    const password = this.formValue('password');
    this.authService.login(email, password).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.goToHome();
      }
    });
  }

  goToHome() {
    this.router.navigate(['']);
  }

  private formValue(field: string) {
    return (this.loginForm.get(field) || {}).value;
  }
}
