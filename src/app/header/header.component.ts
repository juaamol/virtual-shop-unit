import { Component } from '@angular/core';
import { AuthService } from '../login/services/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.loggedInChanges$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate([]);
  }
}
