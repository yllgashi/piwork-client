import { NgModule } from '@angular/core';
import { PrivatePage } from './private.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
  declarations: [PrivatePage],
  imports: [SharedModule, PrivateRoutingModule],
})
export class PrivateModule {}
