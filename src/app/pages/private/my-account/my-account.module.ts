import { NgModule } from '@angular/core';

import { MyAccountPageRoutingModule } from './my-account-routing.module';
import { MyAccountPage } from './my-account.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, MyAccountPageRoutingModule],
  declarations: [MyAccountPage],
})
export class MyAccountPageModule {}
