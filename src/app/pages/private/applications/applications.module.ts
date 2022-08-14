import { NgModule } from '@angular/core';

import { ApplicationsPageRoutingModule } from './applications-routing.module';
import { ApplicationsPage } from './applications.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationItemComponent } from './application-item/application-item.component';

@NgModule({
  imports: [SharedModule, ApplicationsPageRoutingModule],
  declarations: [ApplicationsPage, ApplicationItemComponent],
})
export class ApplicationsPageModule {}
