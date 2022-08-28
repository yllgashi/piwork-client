import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/model/job.model';
import { SearchJob } from 'src/app/shared/model/search-job.model';
import { JobService } from 'src/app/shared/providers/job.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { UserService } from 'src/app/shared/providers/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  areJobsLoading: boolean;
  jobs: Job[];

  constructor(
    private userService: UserService,
    private jobService: JobService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {}

  ionViewDidEnter(): void {
    this.getJobsBasedOnRole();
  }

  getJobsBasedOnRole(): void {
    const userRole: string = this.userService.user$.getValue().role;
    if (userRole == 'Recruiter') this.getAnnouncedJobs();
    else this.getAllJobs();
  }

  getAnnouncedJobs(): void {
    this.onShowLoading();
    this.jobService.getAnnouncedJobs().subscribe({
      next: (res) => this.onAllJobsFetch(res),
      error: (e) => this.onErrorAllJobsFetch(e),
    });
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

  //#endregion helpers

  //#region loadings
  onShowLoading(): void {
    this.areJobsLoading = true;
  }

  onDismissLoading(): void {
    this.areJobsLoading = false;
  }
  //#endregion loadings
}
