import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/shared/model/experience.model';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { AddUserExperienceComponent } from './add-user-experience/add-user-experience.component';

@Component({
  selector: 'app-user-experience',
  templateUrl: './user-experience.component.html',
  styleUrls: ['./user-experience.component.scss'],
})
export class UserExperienceComponent implements OnInit {
  @Input('experience') experience: Experience[];
  @Input('isCurrentUser') isCurrentUser: boolean;

  constructor(private dynamicComponentsService: DynamicComponentsService) {}

  ngOnInit() {}

  onAddUserExperience(): void {
    this.dynamicComponentsService.showModal({
      component: AddUserExperienceComponent,
    });
  }
}
