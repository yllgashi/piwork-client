import { Component, Input, OnInit } from '@angular/core';
import { AlertButton, AlertOptions } from '@ionic/angular';
import { Notification } from 'src/app/shared/model/notification.model';
import { LanguagesService } from 'src/app/shared/providers/common/languages.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit {
  @Input('notification') notification: Notification;

  constructor(
    private dynamicComponentsService: DynamicComponentsService,
    private languagesService: LanguagesService
  ) {}

  ngOnInit() {}

  onNotificationClick(): void {
    const { notificationTopicDescription, message } = this.notification;
    const text = this.languagesService.instant('APP.CANCEL');
    const buttons: AlertButton[] = [
      {
        text,
      },
    ];
    const options: AlertOptions = {
      header: notificationTopicDescription,
      subHeader: message,
      buttons,
    };
    this.dynamicComponentsService.showAlert(options);
  }

  //#region helpers
  get fileBaseUrl(): string {
    return environment.filesUrl;
  }
  //#endregion helpers
}
