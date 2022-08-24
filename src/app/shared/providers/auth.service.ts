import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login.model';
import { Register } from '../model/register.model';
import { HttpService } from './common/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: HttpService) {}

  login(login: Login): Observable<any> {
    const path = 'auth/login';
    return this.httpService.post<any>({ path, body: login });
  }

  register(body: Register): Observable<any> {
    const path = 'auth/register';
    return this.httpService.post<any>({ path, body });
  }
}
