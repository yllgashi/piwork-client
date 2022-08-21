import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/model/job.model';
import { SearchJob } from 'src/app/shared/model/search-job.model';
import { JobService } from 'src/app/shared/providers/job.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  areJobsLoading: boolean;
  jobs: Job[];

  constructor(
    private jobService: JobService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.onShowLoading();
    this.jobService.getAllJobs().subscribe({
      next: (res) => this.onAllJobsFetch(res),
      error: (e) => this.onErrorAllJobsFetch(e),
    });
  }

  onSearchJobs(searchJob: SearchJob): void {
    this.onShowLoading();
    this.jobService.onSearchJobs(searchJob).subscribe({
      next: (res) => this.onAllJobsFetch(res),
      error: (e) => this.onErrorAllJobsFetch(e),
    });
  }

  //#region callbacks
  onAllJobsFetch(jobs: Job[]): void {
    this.onDismissLoading();
    this.jobs = jobs;
  }

  onErrorAllJobsFetch(errorMsg: string): void {
    this.onDismissLoading();
    this.dynamicComponentsService.showTranslatedToast(errorMsg);
  }
  //#endregion callbacks

  //#region helpers
  onShowLoading(): void {
    this.areJobsLoading = true;
  }

  onDismissLoading(): void {
    this.areJobsLoading = false;
  }
  //#endregion helpers
}
