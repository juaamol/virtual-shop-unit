import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
    this.authService.login(email, password).subscribe({
      next: () => this.goHome(),
      error: (error) => {
        this.error = error.error.message;
      },
    });
  }

  goHome() {
    this.router.navigate(['']);
  }

  private formValue(field: string) {
    return (this.loginForm.get(field) || {}).value;
  }
}
