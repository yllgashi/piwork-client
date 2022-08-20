import { NgModule } from '@angular/core';

import { AnnounceJobPageRoutingModule } from './announce-job-routing.module';
import { AnnounceJobPage } from './announce-job.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobCreationNoteComponent } from './job-creation-note/job-creation-note.component';

@NgModule({
  imports: [SharedModule, AnnounceJobPageRoutingModule],
  declarations: [AnnounceJobPage, JobCreationNoteComponent],
})
export class AnnounceJobPageModule {}
