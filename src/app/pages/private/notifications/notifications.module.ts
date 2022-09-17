import { NgModule } from '@angular/core';

import { NotificationsPageRoutingModule } from './notifications-routing.module';
import { NotificationsPage } from './notifications.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationItemComponent } from './notification-item/notification-item.component';

@NgModule({
  imports: [SharedModule, NotificationsPageRoutingModule],
  declarations: [NotificationsPage, NotificationItemComponent],
})
export class NotificationsPageModule {}
