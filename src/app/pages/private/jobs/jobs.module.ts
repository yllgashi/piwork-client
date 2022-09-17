import { NgModule } from '@angular/core';

import { JobsPageRoutingModule } from './jobs-routing.module';

import { JobsPage } from './jobs.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobDetailsComponent } from './job-details/job-details.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { HeaderPictureComponent } from './job-details/header-picture/header-picture.component';
import { JobInformationComponent } from './job-details/job-information/job-information.component';

@NgModule({
  imports: [SharedModule, JobsPageRoutingModule],
  declarations: [
    JobsPage,
    JobDetailsComponent,
    NewApplicationComponent,
    SearchJobsComponent,
    HeaderPictureComponent,
    JobInformationComponent,
  ],
})
export class JobsPageModule {}
