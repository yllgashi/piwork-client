import { Component, Input, OnInit } from '@angular/core';

import { GetJobApplication } from 'src/app/shared/model/get-job-application.model';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { ApplicationDetailsComponent } from '../application-details/application-details.component';

@Component({
  selector: 'app-application-item',
  templateUrl: './application-item.component.html',
  styleUrls: ['./application-item.component.scss'],
})
export class ApplicationItemComponent implements OnInit {
  @Input('application') application: GetJobApplication;

  constructor(private dcService: DynamicComponentsService) {}

  ngOnInit() {}

  onShowApplicationDetails(applicationId: number): void {
    this.dcService.showModal({
      component: ApplicationDetailsComponent,
      componentProps: {
        applicationId: applicationId,
      },
    });
  }
}
