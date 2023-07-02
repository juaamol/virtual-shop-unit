import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from 'src/app/data/types/User';
import { filter, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { UserUpload } from '../../../data/types/user-upload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly accessTokenKey = 'accessToken';

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  login(email: string, password: string) {
    const url = environment.loginAPIUrl;
    const body = { email, password };
    return this.httpClient.post(url, body).pipe(
      tap((response: any) => {
        const accessToken = response.access_token;
        localStorage.setItem(this.accessTokenKey, accessToken);
      })
    );
  }

  registerUser(user: UserUpload) {
    return this.userService
      .createUser(user)
      .pipe(switchMap(({ email, password }) => this.login(email, password)));
  }

  getProfile(accessToken: string) {
    const url = environment.profileAPIUrl;
    const headers = { Authorization: `Bearer ${accessToken}` };
    return this.httpClient.get(url, { headers });
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.accessTokenKey);
  }
}
