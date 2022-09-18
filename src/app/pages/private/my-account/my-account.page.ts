import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserDetails } from 'src/app/shared/model/user-details.model';
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
  @Input('userId') userId: number; // if userId is provided, it means it IS NOT current user account
  userDetails: UserDetails;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private userService: UserService,
    private storageService: StorageService,
    private navController: NavController,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {}

  ionViewDidEnter(): void {
    this.checkForUserIdParam();
  }

  // if userId is provided, it means it is being called for different account
  isCurrentUser(): boolean {
    return this.userId ? false : true;
  }

  checkForUserIdParam(): void {
    this.route.params.subscribe((params) => this.onParamsFetch(params));
  }

  onParamsFetch(params): void {
    const { userId } = params;
    if (userId) this.getUserDetails(userId);
    else this.getCurrentUserDetails();
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

  //#region callbacks
  onGetUserDetailsRes(res: UserDetails): void {
    this.userDetails = res;
    this.onDismissUserDetailsLoading();
  }

  onGetUserDetailsError(e: any): void {
    this.onDismissUserDetailsLoading();
  }

  //#endregion callbacks

  //#region logout
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
  //#endregion logout

  //#region helpers
  closeModal(): void {
    this.dynamicComponentsService.closeModal();
  }
  //#endregion helpers

  //#region loadings
  onShowUserDetailsLoading(): void {
    this.isLoading = true;
  }

  onDismissUserDetailsLoading(): void {
    this.isLoading = false;
  }
  //#endregion loadings
}
