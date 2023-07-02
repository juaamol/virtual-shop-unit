import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  isEmailValid$!: Observable<boolean>;
  errors: string[] = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }

  ngOnInit() {}

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const name = this.formValue('name');
    const email = this.formValue('email');
    const password = this.formValue('password');
    const avatar = this.formValue('avatar');

    this.authService.registerUser({ name, email, password, avatar }).subscribe({
      next: () => {
        this.router.navigate(['/', 'login']);
      },
      error: (err) => {
        this.errors = err.error.message || [];
      },
    });
  }

  goToHome() {}

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      const avatar = inputElement.files[0];

      this.registerForm.patchValue({ avatar });
    }
  }

  private formValue(field: string) {
    return (this.registerForm.get(field) || {}).value;
  }
}
