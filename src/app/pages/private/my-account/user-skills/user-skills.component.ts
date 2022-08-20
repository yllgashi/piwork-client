import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/shared/model/skill.model';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.scss'],
})
export class UserSkillsComponent implements OnInit {
  @Input('skills') skills: Skill[];

  constructor() {}

  ngOnInit() {}
}
