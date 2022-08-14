import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { JobDetails } from 'src/app/shared/model/job-details.model';
import { JobService } from 'src/app/shared/providers/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  jobDetails: JobDetails;
  isLoading: boolean;

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit() {
    this.getQueryParams()
      .pipe(tap((id) => this.getJobDetails(id)))
      .subscribe();
  }

  getQueryParams(): Observable<string> {
    return this.route.params.pipe(
      map((params) => this.onQueryParamsFetch(params))
    );
  }

  onQueryParamsFetch(params): string {
    const { id } = params;
    return id;
  }

  getJobDetails(id: string): void {
    this.onShowLoading();
    this.jobService.getJobDetails(id).subscribe({
      next: (res) => this.onJobDetailsFetch(res),
      error: (e) => this.onJobDetailsFetchError(e),
    });
  }

  onJobDetailsFetch(res: JobDetails): void {
    this.jobDetails = res;
    this.onDismissLoading();
  }

  onJobDetailsFetchError(e: any): void {
    this.onDismissLoading();
  }

  onSourceCodeClick(): void {}

  onPublisherClick(): void {}

  //#region helpers
  onShowLoading(): void {
    this.isLoading = true;
  }

  onDismissLoading(): void {
    this.isLoading = false;
  }
  //#endregion helpers
}
