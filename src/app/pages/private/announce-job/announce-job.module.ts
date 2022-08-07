import { NgModule } from '@angular/core';

import { AnnounceJobPageRoutingModule } from './announce-job-routing.module';
import { AnnounceJobPage } from './announce-job.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, AnnounceJobPageRoutingModule],
  declarations: [AnnounceJobPage],
})
export class AnnounceJobPageModule {}
