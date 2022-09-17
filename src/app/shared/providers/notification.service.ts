import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';
import { Notification } from '../model/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private httpService: HttpService) {}

  getNotifications(): Observable<Notification[]> {
    const path = `notifications`;
    return this.httpService.get<Notification[]>({ path });
  }
}
