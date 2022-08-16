import { NgModule } from '@angular/core';

import { ApplicationsPageRoutingModule } from './applications-routing.module';
import { ApplicationsPage } from './applications.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationItemComponent } from './application-item/application-item.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';

@NgModule({
  imports: [SharedModule, ApplicationsPageRoutingModule],
  declarations: [
    ApplicationsPage,
    ApplicationItemComponent,
    ApplicationDetailsComponent,
  ],
})
export class ApplicationsPageModule {}
