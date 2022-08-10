import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/model/job.model';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent implements OnInit {
  @Input('job') job: Job;

  constructor() {}

  ngOnInit() {}
}
