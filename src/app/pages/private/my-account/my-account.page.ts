import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/shared/model/user-details.model';
import { User } from 'src/app/shared/model/user.model';
import { AccountService } from 'src/app/shared/providers/account.service';
import { StorageService } from 'src/app/shared/providers/native/storage.service';
import { UserService } from 'src/app/shared/providers/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  userDetails: UserDetails;
  user$: Subscription;
  isUserDetailsLoading: boolean;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private storageService: StorageService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.onShowUserDetailsLoading();
    this.user$ = this.userService.user$.subscribe((res) =>
      this.onUserFetch(res)
    );
  }

  getUserDetails(userId: number) {
    this.accountService.getUserDetails(userId).subscribe({
      next: (res) => this.onGetUserDetailsRes(res),
      error: (e) => this.onGetUserDetailsError(e),
    });
  }

  onLogout(): void {
    this.removeUserState();
    this.removeDataInStorage();
  }

  removeUserState(): void {
    this.userService.removeUser();
  }

  removeDataInStorage(): void {
    this.storageService.clear().subscribe({
      next: (res) => this.navigateToPublicModule(),
    });
  }

  navigateToPublicModule(): void {
    this.navController.navigateRoot(['/account']);
  }

  //#region callbacks
  onGetUserDetailsRes(res: UserDetails): void {
    this.userDetails = res;
    this.onDismissUserDetailsLoading();
  }

  onGetUserDetailsError(e: any): void {
    this.onDismissUserDetailsLoading();
  }

  onUserFetch(user: User): void {
    if (!user) {
      this.onDismissUserDetailsLoading();
      return;
    }
    const { userId } = user;
    this.getUserDetails(userId);
  }
  //#endregion callbacks

  //#region loadings
  onShowUserDetailsLoading(): void {
    this.isUserDetailsLoading = true;
  }

  onDismissUserDetailsLoading(): void {
    this.isUserDetailsLoading = false;
  }
  //#endregion loadings
}
