import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/shared/model/experience.model';

@Component({
  selector: 'app-user-experience',
  templateUrl: './user-experience.component.html',
  styleUrls: ['./user-experience.component.scss'],
})
export class UserExperienceComponent implements OnInit {
  @Input('experience') experience: Experience[];
  
  constructor() {}

  ngOnInit() {}
}
