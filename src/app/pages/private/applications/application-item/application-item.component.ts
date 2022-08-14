import { Component, Input, OnInit } from '@angular/core';
import { GetJobApplication } from 'src/app/shared/model/get-job-application.model';

@Component({
  selector: 'app-application-item',
  templateUrl: './application-item.component.html',
  styleUrls: ['./application-item.component.scss'],
})
export class ApplicationItemComponent implements OnInit {
  @Input('application') application: GetJobApplication;

  constructor() {}

  ngOnInit() {}

  onDeleteJobApplication(): void {}

  onShowDetails(): void {}
}
