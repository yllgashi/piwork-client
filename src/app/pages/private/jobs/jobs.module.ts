import { NgModule } from '@angular/core';

import { JobsPageRoutingModule } from './jobs-routing.module';

import { JobsPage } from './jobs.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobItemComponent } from './overview/job-item/job-item.component';
import { NewApplicationComponent } from './new-application/new-application.component';

@NgModule({
  imports: [SharedModule, JobsPageRoutingModule],
  declarations: [
    JobsPage,
    OverviewComponent,
    JobItemComponent,
    JobDetailsComponent,
    NewApplicationComponent
  ],
})
export class JobsPageModule {}
