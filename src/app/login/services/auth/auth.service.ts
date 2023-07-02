import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from 'src/app/data/types/User';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userKey = 'currentUser';

  constructor(private userService: UserService) {}

  login(email: string, password: string) {
    return this.userService.getUserByEmail(email).pipe(
      filter((user) => user !== undefined),
      tap((user) => {
        if (user!.password === password) {
          localStorage.setItem(this.userKey, JSON.stringify(user));
        }

        return user!.password === password;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  getCurrentUser(): User | null {
    const userString = localStorage.getItem(this.userKey);
    return userString ? JSON.parse(userString) : null;
  }
}
