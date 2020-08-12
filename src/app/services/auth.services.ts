import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  email: string;
  username: string;
  expire: number;
  expireDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userBehavior: BehaviorSubject<User> = new BehaviorSubject(null);

  get user(): User {
    return this.userBehavior.value;
  }

  set user(user: User) {
    this.userBehavior.next(user);
  }

  fakeLogin(): void {
    const expire = Date.now() + 1000;
    this.user = {
      email: 'test',
      username: 'fake test',
      expire,
      expireDate: new Date(expire),
    };
  }

  logout(): void {
    this.user = null;
  }

}
