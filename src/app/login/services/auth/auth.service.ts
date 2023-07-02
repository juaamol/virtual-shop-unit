import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from 'src/app/data/types/User';
import { filter, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly accessTokenKey = 'accessToken';

  constructor(private httpClient: HttpClient) {}

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
