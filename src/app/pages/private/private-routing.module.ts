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
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadChildren: () =>
          import('./overview/overview.module').then(
            (m) => m.OverviewPageModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchPageModule),
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
