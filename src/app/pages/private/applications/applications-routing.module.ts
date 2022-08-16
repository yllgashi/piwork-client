import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationDetailsComponent } from './application-details/application-details.component';

import { ApplicationsPage } from './applications.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsPage,
  },
  {
    path: ':id',
    component: ApplicationDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationsPageRoutingModule {}
