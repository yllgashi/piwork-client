import { NgModule } from '@angular/core';

import { MyAccountPageRoutingModule } from './my-account-routing.module';
import { MyAccountPage } from './my-account.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderPictureComponent } from './header-picture/header-picture.component';
import { NameAndDescriptionComponent } from './name-and-description/name-and-description.component';
import { UserExperienceComponent } from './user-experience/user-experience.component';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { UserSkillsComponent } from './user-skills/user-skills.component';

@NgModule({
  imports: [SharedModule, MyAccountPageRoutingModule],
  declarations: [
    MyAccountPage,
    HeaderPictureComponent,
    NameAndDescriptionComponent,
    UserExperienceComponent,
    UserTasksComponent,
    UserSkillsComponent,
  ],
})
export class MyAccountPageModule {}
