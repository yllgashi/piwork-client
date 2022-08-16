import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/shared/model/notification.model';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit {
  @Input('notification') notification: Notification;

  constructor() {}

  ngOnInit() {}

  onNotificationClick(): void {}
}
