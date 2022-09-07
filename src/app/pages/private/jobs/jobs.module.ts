import { NgModule } from '@angular/core';

import { JobsPageRoutingModule } from './jobs-routing.module';

import { JobsPage } from './jobs.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { SearchJobsComponent } from './overview/search-jobs/search-jobs.component';
import { HeaderPictureComponent } from './job-details/header-picture/header-picture.component';
import { JobInformationComponent } from './job-details/job-information/job-information.component';

@NgModule({
  imports: [SharedModule, JobsPageRoutingModule],
  declarations: [
    JobsPage,
    OverviewComponent,

    JobDetailsComponent,
    NewApplicationComponent,
    SearchJobsComponent,
    HeaderPictureComponent,
    JobInformationComponent,
  ],
})
export class JobsPageModule {}
