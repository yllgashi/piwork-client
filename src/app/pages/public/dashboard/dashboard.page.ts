import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/shared/model/job.model';
import { JobService } from 'src/app/shared/providers/job.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  areJobsLoading: boolean;
  jobs: Job[];

  constructor(
    private router: Router,
    private jobService: JobService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {}

  navigateToAccountPage(): void {
    this.router.navigate(['/account']);
  }

  ionViewDidEnter(): void {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.onShowLoading();
    this.jobService.getAllJobs().subscribe({
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

  //#region loadings
  onShowLoading(): void {
    this.areJobsLoading = true;
  }

  onDismissLoading(): void {
    this.areJobsLoading = false;
  }
  //#endregion loadings
}
