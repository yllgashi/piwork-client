import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  decodeUserFromToken(accessToken): User {
    const data = jwt_decode(accessToken) as any;
    const { userId, firstName, lastName, email, role } = data;
    const user: User = {
      userId,
      firstName,
      lastName,
      email,
      role,
      accessToken,
    };
    return user;
  }

  isTokenExpired(accessToken: string): boolean {
    if (!accessToken) return true;
    const data = jwt_decode(accessToken) as any;
    const { exp } = data;
    const expired: boolean = Date.now() >= exp * 1000;
    return expired;
  }
}
