import { NgModule } from '@angular/core';
import { PrivateComponent } from './private.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
  declarations: [PrivateComponent],
  imports: [SharedModule, PrivateRoutingModule],
})
export class PrivateModule {}
