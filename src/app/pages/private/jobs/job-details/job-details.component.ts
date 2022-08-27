import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobDetails } from 'src/app/shared/model/job-details.model';
import { BrowserService } from 'src/app/shared/providers/browser.service';
import { JobService } from 'src/app/shared/providers/job.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { NewApplicationComponent } from '../new-application/new-application.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  jobDetails: JobDetails;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private dynamicComponentsService: DynamicComponentsService,
    private browserService: BrowserService
  ) {}

  ngOnInit() {
    this.getParamsAndShowJobDetails();
  }

  getParamsAndShowJobDetails(): void {
    this.route.params.subscribe((params) => this.onParamsFetch(params));
  }

  onParamsFetch(params): void {
    const { id } = params;
    this.getJobDetails(id);
  }

  getJobDetails(id: string): void {
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
    const { id } = this.jobDetails;
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
