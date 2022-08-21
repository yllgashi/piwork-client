import { NgModule } from '@angular/core';

import { JobsPageRoutingModule } from './jobs-routing.module';

import { JobsPage } from './jobs.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobItemComponent } from './overview/job-item/job-item.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { SearchJobsComponent } from './overview/search-jobs/search-jobs.component';

@NgModule({
  imports: [SharedModule, JobsPageRoutingModule],
  declarations: [
    JobsPage,
    OverviewComponent,
    JobItemComponent,
    JobDetailsComponent,
    NewApplicationComponent,
    SearchJobsComponent
  ],
})
export class JobsPageModule {}
