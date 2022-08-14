import { Component, OnInit } from '@angular/core';
import { GetJobApplication } from 'src/app/shared/model/get-job-application.model';
import { ApplicationService } from 'src/app/shared/providers/application.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.page.html',
  styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {
  applications: GetJobApplication[];
  areApplicationsLoading: boolean;

  constructor(
    private applicationService: ApplicationService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.onShowLoading();
    this.applicationService.getJobApplications().subscribe({
      next: (res) => this.onAllJobsFetch(res),
      error: (e) => this.onErrorAllJobsFetch(e),
    });
  }

  onAllJobsFetch(jobs: GetJobApplication[]): void {
    this.onDismissLoading();
    this.applications = jobs;
  }

  onErrorAllJobsFetch(errorMsg: string): void {
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
