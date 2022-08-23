import { Component, OnInit } from '@angular/core';
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
  applications: GetJobApplication[];
  areApplicationsLoading: boolean;

  constructor(
    private userService: UserService,
    private applicationService: ApplicationService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications(): void {
    debugger;
    const userRole: string = this.userService.user$.getValue().role;
    if (userRole == 'Recruiter') this.getAnnouncedAppications();
    else this.getAllApplications();
  }

  getAnnouncedAppications(): void {
    this.onShowLoading();
    this.applicationService.getAnnouncedJobs().subscribe({
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

  onAllApplicationsFetch(jobs: GetJobApplication[]): void {
    this.onDismissLoading();
    this.applications = jobs;
  }

  onAllApplicationsError(errorMsg: string): void {
    this.onDismissLoading();
    this.dynamicComponentsService.showTranslatedToast(errorMsg);
  }

  //#region helpers
  onShowLoading(): void {
    this.areApplicationsLoading = true;
  }

  onDismissLoading(): void {
    this.areApplicationsLoading = false;
  }
  //#endregion helpers
}
