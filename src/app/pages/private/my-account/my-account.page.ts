import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserDetails } from 'src/app/shared/model/user-details.model';
import { User } from 'src/app/shared/model/user.model';
import { AccountService } from 'src/app/shared/providers/account.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { StorageService } from 'src/app/shared/providers/native/storage.service';
import { UserService } from 'src/app/shared/providers/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  @Input('userId') userId: number;
  userDetails: UserDetails;
  isUserDetailsLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private userService: UserService,
    private storageService: StorageService,
    private navController: NavController,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.checkForUserIdParam();
  }

  checkForUserIdParam(): void {
    this.route.params.subscribe((params) => this.onParamsFetch(params));
  }

  onParamsFetch(params): void {
    const { userId } = params;
    if (userId) this.getUserDetails(userId);
    else this.getCurrentUserDetails();
  }

  isCurrentUser(): boolean {
    // if userId is provided, it means it is being called for different account
    return this.userId ? false : true;
  }

  getCurrentUserDetails(): void {
    const { userId } = this.userService.user$.getValue();
    this.getUserDetails(userId);
  }

  getUserDetails(userId: number) {
    this.onShowUserDetailsLoading();
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

  closeModal(): void {
    this.dynamicComponentsService.closeModal();
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
