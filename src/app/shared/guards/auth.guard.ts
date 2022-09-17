import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtService } from '../providers/common/jwt.service';
import { StorageService } from '../providers/native/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private jwtService: JwtService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.storageService.get('accessToken').pipe(
      map((accessToken) => this.onCheckForAuthorization(accessToken)),
      catchError(() => this.onError())
    );
  }

  onCheckForAuthorization(accessToken: string): boolean {
    if (!accessToken) this.onError();
    const isExpired: boolean = this.jwtService.isTokenExpired(accessToken);
    if (isExpired) throw new Error();
    return true;
  }

  onError(): Observable<any> {
    this.storageService.clear().subscribe();
    return of(this.router.navigateByUrl('/dashboard'));
  }
}
