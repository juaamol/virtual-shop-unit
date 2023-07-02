import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  isEmailValid$!: Observable<boolean>;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
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

    this.userService
      .createUser({ email, password, name, avatar: '' })
      .subscribe();
  }

  goToHome() {
    this.router.navigate(['']);
  }

  private formValue(field: string) {
    return (this.registerForm.get(field) || {}).value;
  }
}
