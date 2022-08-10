import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new BehaviorSubject<User>(null);

  constructor() {}

  initializeUser(user: User): void {
    this.user$.next(user);
  }

  removeUser(): void {
    this.user$.next(null);
  }
}
