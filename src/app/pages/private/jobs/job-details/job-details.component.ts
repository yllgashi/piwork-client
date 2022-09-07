import { Component, Input, OnInit } from '@angular/core';
import { JobDetails } from 'src/app/shared/model/job-details.model';
import { JobService } from 'src/app/shared/providers/job.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { ApplicationsPage } from '../../applications/applications.page';
import { NewApplicationComponent } from '../new-application/new-application.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  @Input('jobId') jobId: number;
  jobDetails: JobDetails;
  isLoading: boolean;

  constructor(
    private jobService: JobService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {}

  ionViewDidEnter(): void {
    this.getJobDetails(this.jobId);
  }

  getJobDetails(id: number): void {
    this.onShowLoading();
    this.jobService.getJobDetails(id).subscribe({
      next: (res) => this.onJobDetailsFetch(res),
      error: (e) => this.onJobDetailsFetchError(e),
    });
  }

  //#region callbacks
  onJobDetailsFetch(res: JobDetails): void {
    this.jobDetails = res;
    this.onDismissLoading();
  }

  onJobDetailsFetchError(e: any): void {
    this.onDismissLoading();
  }
  //#endregion callbacks

  onShowJobApplications(): void {
    const { id, title } = this.jobDetails;
    this.dynamicComponentsService.showModal({
      component: ApplicationsPage,
      componentProps: {
        jobId: id,
        jobTitle: title,
      },
    });
  }

  onProceedWithApplication(): void {
    const { id, title } = this.jobDetails;
    this.dynamicComponentsService.showModal({
      component: NewApplicationComponent,
      componentProps: {
        jobId: id,
        jobTitle: title,
      },
    });
  }

  //#region loadings
  onShowLoading(): void {
    this.isLoading = true;
  }

  onDismissLoading(): void {
    this.isLoading = false;
  }
  //#endregion loadings
}
