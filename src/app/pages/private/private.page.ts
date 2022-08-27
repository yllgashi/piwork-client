import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user.model';
import { JwtService } from 'src/app/shared/providers/common/jwt.service';
import { StorageService } from 'src/app/shared/providers/native/storage.service';
import { UserService } from 'src/app/shared/providers/user.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {
  isUserLoading: boolean;

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    this.fetchTokensAndInitializeUser();
  }

  fetchTokensAndInitializeUser(): void {
    this.onShowUserLoading();
    this.fetchAccesstokenFromStorage();
  }

  fetchAccesstokenFromStorage(): void {
    this.storageService.get('accessToken').subscribe({
      next: (res) => this.onFetchAccesstokenFromStorageRes(res),
      error: (e) => this.onFetchAccesstokenFromStorageError(e),
    });
  }

  //#region callbacks
  onFetchAccesstokenFromStorageRes(accessToken: string): void {
    const decodedUser: User = this.decodeUserFromAccesstoken(accessToken);
    this.saveUserState(decodedUser);
  }

  onFetchAccesstokenFromStorageError(errorMsg: string): void {
    this.onDismissUserLoading();
  }
  //#endregion callbacks

  decodeUserFromAccesstoken(accessToken: string): User {
    return this.jwtService.decodeUserFromToken(accessToken);
  }

  saveUserState(user: User): void {
    this.userService.initializeUser(user);
    this.onDismissUserLoading();
  }

  //#region loadings
  onShowUserLoading(): void {
    this.isUserLoading = true;
  }

  onDismissUserLoading(): void {
    this.isUserLoading = false;
  }
  //#endregion loadings
}
