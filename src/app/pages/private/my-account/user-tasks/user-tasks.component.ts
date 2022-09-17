import { Component, Input, OnInit } from '@angular/core';
import { AlertButton, AlertOptions } from '@ionic/angular';
import { UserJob } from 'src/app/shared/model/user-job.model';
import { LanguagesService } from 'src/app/shared/providers/common/languages.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit {
  @Input('jobs') jobs: UserJob[];

  constructor(
    private dynamicComponentsService: DynamicComponentsService,
    private languagesService: LanguagesService
  ) {}

  ngOnInit() {}

  onShowDetails(job: UserJob): void {
    const header = job.jobTitle;
    const message = '<b>Employer comment: </b>' + job.employerComment;
    const text = this.languagesService.instant('APP.CANCEL');
    const buttons: AlertButton[] = [
      {
        text,
      },
    ];
    const options: AlertOptions = {
      header,

      message,
      buttons,
    };
    this.dynamicComponentsService.showAlert(options);
  }
}
