import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnounceJobPage } from './announce-job.page';

const routes: Routes = [
  {
    path: '',
    component: AnnounceJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnounceJobPageRoutingModule {}
