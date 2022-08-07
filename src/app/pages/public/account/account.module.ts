import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
];

@NgModule({
  declarations: [AccountComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AccountModule {}
