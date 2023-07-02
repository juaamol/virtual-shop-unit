import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { User } from '../../../data/types/User';
import { map, switchMap } from 'rxjs/operators';
import { FileService } from '../file/file.service';
import { UserUpload } from 'src/app/data/types/user-upload';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private fileService: FileService) {}

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

  createUser(user: UserUpload) {
    const url = environment.usersAPIUrl;

    return this.fileService.uploadFile(user.avatar).pipe(
      map((file) => file.location),
      switchMap((avatar) => this.http.post<User>(url, { ...user, avatar }))
    );
  }

  isEmailAvailable(email: string) {
    const url = environment.usersAPIUrl;
    return this.http
      .post<{ isAvailable: boolean }>(`${url}/is-available`, {
        email,
      })
      .pipe(map((availability) => availability.isAvailable));
  }
}
