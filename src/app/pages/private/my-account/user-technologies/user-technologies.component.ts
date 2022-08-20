import { Component, Input, OnInit } from '@angular/core';
import { Technology } from 'src/app/shared/model/technology.model';

@Component({
  selector: 'app-user-technologies',
  templateUrl: './user-technologies.component.html',
  styleUrls: ['./user-technologies.component.scss'],
})
export class UserTechnologiesComponent implements OnInit {
  @Input('technologies') technologies: Technology[];

  constructor() {}

  ngOnInit() {}
}
