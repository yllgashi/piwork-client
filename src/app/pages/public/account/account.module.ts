import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountComponent } from './account.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
];

@NgModule({
  declarations: [AccountComponent, LoginFormComponent, RegisterFormComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AccountModule {}
