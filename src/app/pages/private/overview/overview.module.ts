import { NgModule } from '@angular/core';

import { OverviewPageRoutingModule } from './overview-routing.module';
import { OverviewPage } from './overview.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobItemComponent } from './job-item/job-item.component';

@NgModule({
  imports: [SharedModule, OverviewPageRoutingModule],
  declarations: [OverviewPage, JobItemComponent],
})
export class OverviewPageModule {}
