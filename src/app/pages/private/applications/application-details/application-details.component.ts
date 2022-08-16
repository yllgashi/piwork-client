import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetJobApplication } from 'src/app/shared/model/get-job-application.model';
import { ApplicationService } from 'src/app/shared/providers/application.service';

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
    private applicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.getParams();
  }

  getParams(): void {
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

  onGetApplicationDetailsRes(response: GetJobApplication): void {
    this.onDismissLoading();
    this.jobApplicationDetails = response;
  }

  onGetApplicationDetailsError(error: string): void {
    this.onDismissLoading();
  }

  onDeleteJobApplication(): void {
    const { id } = this.jobApplicationDetails;
    this.applicationService.deleteApplication(id).subscribe({
      next: (res) => this.onDeleteJobApplicationRes(res),
      error: (e) => this.onDeleteJobApplicationError(e),
    });
  }

  onDeleteJobApplicationRes(result: any): void {}

  onDeleteJobApplicationError(error: any): void {}

  onShowLoading(): void {
    this.isLoading = true;
  }

  onDismissLoading(): void {
    this.isLoading = false;
  }
}
