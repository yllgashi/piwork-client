import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/shared/model/user-details.model';
import { UserExperience } from 'src/app/shared/model/user-experience.model';
import { UserField } from 'src/app/shared/model/user-fields.model';
import { UserTechnology } from 'src/app/shared/model/user-technology.model';
import { User } from 'src/app/shared/model/user.model';
import { AccountService } from 'src/app/shared/providers/account.service';
import { UserService } from 'src/app/shared/providers/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  userDetails: UserDetails;
  userExperiences: UserExperience[];
  userFields: UserField[];
  userTechnologies: UserTechnology[];
  user$: Subscription;
  isUserDetailsLoading: boolean;
  areUserExperiencesLoading: boolean;
  areUserFieldsLoading: boolean;
  areUserTechnologiesLoading: boolean;

  constructor(
    private accountService: AccountService,
    private userService: UserService
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

  onUserFetch(user: User): void {
    const { userId } = user;
    if (!userId) return;
    setTimeout(() => this.getUserDetails(userId), 1000);
    setTimeout(() => this.getUserExperience(userId), 3000);
    setTimeout(() => this.getUserFields(userId), 5000);
    setTimeout(() => this.getUserTechnologies(userId), 7000);

    // this.getUserDetails(userId);
    // this.getUserExperience(userId);
    // this.getUserFields(userId);
    // this.getUserTechnologies(userId);
  }

  getUserDetails(userId: number) {
    this.onShowUserDetailsLoading();
    this.accountService.getUserDetails(userId).subscribe({
      next: (res) => this.onGetUserDetailsRes(res),
      error: (e) => this.onGetUserDetailsError(e),
    });
  }

  getUserExperience(userId: number) {
    this.onShowUserExperiencesLoading();
    this.accountService.getUserExperience(userId).subscribe({
      next: (res) => this.onGetUserExperienceRes(res),
      error: (e) => this.onGetUserExperienceError(e),
    });
  }

  getUserFields(userId: number) {
    this.onShowUserFieldsLoading();
    this.accountService.getUserFields(userId).subscribe({
      next: (res) => this.onGetUserFieldsRes(res),
      error: (e) => this.onGetUserFieldsError(e),
    });
  }

  getUserTechnologies(userId: number) {
    this.onShowUserTechnologiesLoading();
    this.accountService.getUserTechnologies(userId).subscribe({
      next: (res) => this.onGetUserTechnologiesRes(res),
      error: (e) => this.onGetUserTechnologiesError(e),
    });
  }

  //#region callbacks
  onGetUserDetailsRes(res: UserDetails): void {
    this.userDetails = res;
    console.log(res);
    this.onDismissUserDetailsLoading();
  }
  onGetUserDetailsError(e: any): void {
    this.onDismissUserDetailsLoading();
  }

  onGetUserExperienceRes(res: UserExperience[]): void {
    this.userExperiences = res;
    console.log(res);
    this.onDismissUserExperiencesLoading();
  }
  onGetUserExperienceError(e: any): void {
    this.onDismissUserExperiencesLoading();
  }

  onGetUserFieldsRes(res: UserField[]): void {
    this.userFields = res;
    console.log(res);
    this.onDismissUserFieldsLoading();
  }
  onGetUserFieldsError(e: any): void {
    this.onDismissUserFieldsLoading();
  }

  onGetUserTechnologiesRes(res: UserTechnology[]): void {
    this.userTechnologies = res;
    console.log(res);
    this.onDismissUserTechnologiesLoading();
  }

  onGetUserTechnologiesError(e: any): void {
    this.onDismissUserTechnologiesLoading();
  }
  //#endregion callbacks

  //#region loadings
  onShowUserDetailsLoading(): void {
    this.isUserDetailsLoading = true;
  }

  onDismissUserDetailsLoading(): void {
    this.isUserDetailsLoading = false;
  }

  onShowUserExperiencesLoading(): void {
    this.areUserExperiencesLoading = true;
  }

  onDismissUserExperiencesLoading(): void {
    this.areUserExperiencesLoading = false;
  }

  onShowUserFieldsLoading(): void {
    this.areUserFieldsLoading = true;
  }

  onDismissUserFieldsLoading(): void {
    this.areUserFieldsLoading = false;
  }

  onShowUserTechnologiesLoading(): void {
    this.areUserTechnologiesLoading = true;
  }

  onDismissUserTechnologiesLoading(): void {
    this.areUserTechnologiesLoading = false;
  }
  //#endregion loadings
}
