import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss'],
})
export class NewApplicationComponent implements OnInit {
  @Input('jobId') jobId: number;
  @Input('jobTitle') jobTitle: string;

  constructor() {}

  ngOnInit() {
    console.log(this.jobId)
    console.log(this.jobTitle)
  }
}
