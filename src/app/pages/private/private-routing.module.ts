import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivatePage } from './private.page';

const routes: Routes = [
  {
    path: '',
    component: PrivatePage,
    children: [
      {
        path: '',
        redirectTo: 'jobs',
        pathMatch: 'full',
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./jobs/jobs.module').then((m) => m.JobsPageModule),
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('./applications/applications.module').then(
            (m) => m.ApplicationsPageModule
          ),
      },
      {
        path: 'announce-job',
        loadChildren: () =>
          import('./announce-job/announce-job.module').then(
            (m) => m.AnnounceJobPageModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then(
            (m) => m.NotificationsPageModule
          ),
      },
      {
        path: 'my-account',
        loadChildren: () =>
          import('./my-account/my-account.module').then(
            (m) => m.MyAccountPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
