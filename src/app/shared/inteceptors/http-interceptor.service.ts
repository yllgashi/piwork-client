import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { User } from '../model/user.model';
import { UserService } from '../providers/user.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.userService.user$.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) return this.onAnonymousRequest(req, next);
        else return this.onAuthorizedRequest(req, next, user);
      })
    );
  }

  private onAnonymousRequest(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req);
  }

  private onAuthorizedRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    user: User
  ) {
    const newHeaders: HttpHeaders = this.createAuthorizationHeaders(req, user);
    const modifiedReq: HttpRequest<any> = this.onAddHeadersToRequest(
      req,
      newHeaders
    );
    return next.handle(modifiedReq);
  }

  //#region helpers
  private createAuthorizationHeaders(
    req: HttpRequest<any>,
    user: User
  ): HttpHeaders {
    let { headers } = req;
    const { accessToken } = user;
    headers = headers.append('Authorization', 'Bearer ' + accessToken);
    return headers;
  }

  private onAddHeadersToRequest(
    req: HttpRequest<any>,
    newHeaders: HttpHeaders
  ): HttpRequest<any> {
    const modifiedReq = req.clone({
      headers: newHeaders,
    });
    return modifiedReq;
  }
  //#endregion helpers
}
