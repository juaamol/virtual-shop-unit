import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { User } from '../../../data/types/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    const url = environment.usersAPIUrl;
    return this.http.get<User[]>(url);
  }

  getUserById(id: number) {
    const url = environment.usersAPIUrl;
    return this.http.get<User>(`${url}/${id}`);
  }

  getUserByEmail(email: string) {
    return this.getUsers().pipe(
      map((users) => users.find((user) => user.email === email))
    );
  }

  createUser(user: User) {
    const url = environment.usersAPIUrl;
    return this.http.post<User>(url, user);
  }

  checkEmailAvailability(email: string) {
    const url = environment.usersAPIUrl;
    return this.http.post<{ isAvailable: boolean }>(`${url}/is-available`, {
      email,
    });
  }
}
