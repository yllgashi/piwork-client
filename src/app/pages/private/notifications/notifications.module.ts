import { NgModule } from '@angular/core';

import { NotificationsPageRoutingModule } from './notifications-routing.module';
import { NotificationsPage } from './notifications.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, NotificationsPageRoutingModule],
  declarations: [NotificationsPage],
})
export class NotificationsPageModule {}
