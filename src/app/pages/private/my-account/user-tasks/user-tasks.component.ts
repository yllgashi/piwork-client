import { Component, Input, OnInit } from '@angular/core';
import { UserJob } from 'src/app/shared/model/user-job.model';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit {
  @Input('jobs') jobs: UserJob[];

  constructor() {}

  ngOnInit() {}
}
