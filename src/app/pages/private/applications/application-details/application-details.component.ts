import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertButton, AlertOptions } from '@ionic/angular';
import { GetJobApplication } from 'src/app/shared/model/get-job-application.model';
import { ApplicationService } from 'src/app/shared/providers/application.service';
import { LanguagesService } from 'src/app/shared/providers/common/languages.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { environment } from 'src/environments/environment';
import { MyAccountPage } from '../../my-account/my-account.page';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
})
export class ApplicationDetailsComponent implements OnInit {
  jobApplicationDetails: GetJobApplication;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private dynamicComponentsService: DynamicComponentsService,
    private languagesService: LanguagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewDidEnter(): void {
    this.fetchParamsAndGetApplicationDetails();
  }

  get fileBaseUrl(): string {
    return environment.filesUrl;
  }

  fetchParamsAndGetApplicationDetails(): void {
    this.route.params.subscribe({
      next: (params) => this.onParamsFetch(params),
    });
  }

  onParamsFetch(params): void {
    const { id } = params;
    this.getApplicationDetails(+id);
  }

  getApplicationDetails(applicationId: number): void {
    this.onShowLoading();
    this.applicationService.getJobApplicationDetails(applicationId).subscribe({
      next: (res) => this.onGetApplicationDetailsRes(res),
      error: (e) => this.onGetApplicationDetailsError(e),
    });
  }

  onDeleteJobApplication(): void {
    const { id } = this.jobApplicationDetails;
    this.applicationService.deleteApplication(id).subscribe({
      next: (res) => this.onDeleteJobApplicationRes(res),
      error: (e) => this.onDeleteJobApplicationError(e),
    });
  }

  onApplicantDetailsClick(): void {
    const { applicantUserId } = this.jobApplicationDetails;
    this.dynamicComponentsService.showModal({
      component: MyAccountPage,
      componentProps: {
        userId: applicantUserId,
      },
    });
  }

  onSelectWinnerApplication(): void {
    const { id } = this.jobApplicationDetails;
    this.applicationService.selectWinnerApplication(id).subscribe({
      next: (res) => this.onSelectWinnerApplicationRes(res),
      error: (e) => this.onSelectWinnerApplicationError(e),
    });
  }

  //#region callbacks
  onGetApplicationDetailsRes(response: GetJobApplication): void {
    this.onDismissLoading();
    this.jobApplicationDetails = response;
  }

  onGetApplicationDetailsError(error: string): void {
    this.onDismissLoading();
  }

  onDeleteJobApplicationRes(result: any): void {}

  onDeleteJobApplicationError(error: any): void {}

  onSelectWinnerApplicationRes(response: any): void {
    this.navigateToJobs();
    this.showSuccessWinnerApplicationSelectAlert();
  }

  onSelectWinnerApplicationError(error: any): void {
    this.onDismissLoading();
  }
  //#endregion callbacks

  //#region helpers
  navigateToJobs(): void {
    this.router.navigate(['/jobs']);
  }

  showSuccessWinnerApplicationSelectAlert(): void {
    const header = 'Success';
    const subHeader =
      'Application has been succesfully selected as job winner. This applicant will be notified.';
    const text = this.languagesService.instant('APP.CANCEL');
    const buttons: AlertButton[] = [
      {
        text,
      },
    ];
    const options: AlertOptions = {
      header,
      subHeader,
      buttons,
    };
    this.dynamicComponentsService.showAlert(options);
  }
  //#endregion helpers

  //#region loadings
  onShowLoading(): void {
    this.isLoading = true;
  }

  onDismissLoading(): void {
    this.isLoading = false;
  }
  //#endregion loadings
}
