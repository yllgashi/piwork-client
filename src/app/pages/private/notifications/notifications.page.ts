import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/shared/model/notification.model';
import { NotificationService } from 'src/app/shared/providers/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: Notification[];
  isLoading: boolean;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {}

  ionViewDidEnter(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (res) => this.onGetNotificationsRes(res),
      error: (e) => this.onGetNotificationsError(e),
    });
  }

  //#region callbacks
  onGetNotificationsRes(response: Notification[]): void {
    this.onDismissLoading();
    this.notifications = response;
  }

  onGetNotificationsError(error: string): void {
    this.onDismissLoading();
  }
  //#endregion callbacks

  //#region loadings
  onShowLoading(): void {
    this.isLoading = true;
  }

  onDismissLoading(): void {
    this.isLoading = false;
  }
  //#endregion loadings
}
