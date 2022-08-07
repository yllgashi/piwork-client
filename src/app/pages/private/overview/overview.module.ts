import { NgModule } from '@angular/core';

import { OverviewPageRoutingModule } from './overview-routing.module';
import { OverviewPage } from './overview.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, OverviewPageRoutingModule],
  declarations: [OverviewPage],
})
export class OverviewPageModule {}
