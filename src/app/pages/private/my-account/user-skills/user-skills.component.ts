import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/shared/model/skill.model';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { environment } from 'src/environments/environment';
import { AddUserSkillComponent } from './add-user-skill/add-user-skill.component';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.scss'],
})
export class UserSkillsComponent implements OnInit {
  @Input('skills') skills: Skill[];
  @Input('isCurrentUser') isCurrentUser: boolean;

  constructor(private dcService: DynamicComponentsService) {}

  ngOnInit() {}

  onAddUserSkill(): void {
    this.dcService.showModal({
      component: AddUserSkillComponent,
    });
  }

  get fileBaseUrl(): string {
    return environment.filesUrl;
  }
}
