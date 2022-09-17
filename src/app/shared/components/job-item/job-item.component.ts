import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from '../../model/job.model';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent implements OnInit {
  @Input('job') job: Job;
  @Input('routerLink') routerLink: string;
  @Output() jobItemClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onJobItemClick(): void {
    this.jobItemClick.next();
  }
}
