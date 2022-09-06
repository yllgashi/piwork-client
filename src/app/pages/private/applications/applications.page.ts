import { Component, Input, OnInit } from '@angular/core';
import { GetJobApplication } from 'src/app/shared/model/get-job-application.model';
import { ApplicationService } from 'src/app/shared/providers/application.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { UserService } from 'src/app/shared/providers/user.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.page.html',
  styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {
  @Input('jobId') jobId: number; // if jobId is provided, then it is called as a modal
  @Input('jobTitle') jobTitle: string; // if jobTitle is provided, then it is called as a modal
  applications: GetJobApplication[];
  areApplicationsLoading: boolean;

  constructor(
    private userService: UserService,
    private applicationService: ApplicationService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {}

  ionViewDidEnter(): void {
    this.checkForJobIdAndGetApplications();
  }

  areApplicationsOfOnlyOneJob(): boolean {
    return !!this.jobId;
  }

  checkForJobIdAndGetApplications(): void {
    if (this.jobId) this.getApplicationsByJobId(this.jobId);
    else this.getApplicationsBasedOnRole();
  }

  getApplicationsBasedOnRole(): void {
    const userRole: string = this.userService.user$.getValue().role;
    if (userRole == 'Recruiter') this.getAnnouncedAppications();
    else this.getAllApplications();
  }

  getApplicationsByJobId(jobId: number): void {
    this.onShowLoading();
    this.applicationService.getApplicationsByJobId(jobId).subscribe({
      next: (res) => this.onAllApplicationsFetch(res),
      error: (e) => this.onAllApplicationsError(e),
    });
  }

  getAnnouncedAppications(): void {
    this.onShowLoading();
    this.applicationService.getAnnouncedApplications().subscribe({
      next: (res) => this.onAllApplicationsFetch(res),
      error: (e) => this.onAllApplicationsError(e),
    });
  }

  getAllApplications(): void {
    this.onShowLoading();
    this.applicationService.getJobApplications().subscribe({
      next: (res) => this.onAllApplicationsFetch(res),
      error: (e) => this.onAllApplicationsError(e),
    });
  }

  //#region callbacks
  onAllApplicationsFetch(applications: GetJobApplication[]): void {
    this.onDismissLoading();
    this.applications = applications;
  }

  onAllApplicationsError(errorMsg: string): void {
    this.onDismissLoading();
    this.onShowError(errorMsg);
  }
  //#endregion callbacks

  onShowError(errorMsg) {}
  //#endregion callbacks

  //#region helpers
  closeModal(): void {
    this.dynamicComponentsService.closeModal();
  }
  //#endregion helpers

  //#region loadings
  onShowLoading(): void {
    this.areApplicationsLoading = true;
  }

  onDismissLoading(): void {
    this.areApplicationsLoading = false;
  }
  //#endregion loadings
}
