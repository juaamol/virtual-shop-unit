import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { tap, switchMap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { UserUpload } from '../../../data/types/user-upload';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly accessTokenKey = 'accessToken';
  private isLoggedIn$ = new ReplaySubject<boolean>(1);
  loggedInChanges$: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.isLoggedIn();
    this.loggedInChanges$ = this.isLoggedIn$
      .asObservable()
      .pipe(shareReplay(1));
  }

  login(email: string, password: string) {
    const url = environment.loginAPIUrl;
    const body = { email, password };
    return this.httpClient.post(url, body).pipe(
      tap((response: any) => {
        const accessToken = response.access_token;
        localStorage.setItem(this.accessTokenKey, accessToken);
        this.isLoggedIn$.next(true);
      })
    );
  }

  registerUser(user: UserUpload) {
    return this.userService.createUser(user);
  }

  getProfile(accessToken: string) {
    const url = environment.profileAPIUrl;
    const headers = { Authorization: `Bearer ${accessToken}` };
    return this.httpClient.get(url, { headers });
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    this.isLoggedIn$.next(false);
  }

  isLoggedIn(): boolean {
    const isLoggedIn = !!localStorage.getItem(this.accessTokenKey);
    this.isLoggedIn$.next(isLoggedIn);

    return isLoggedIn;
  }
}
