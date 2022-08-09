import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  authenticationMethod: string;

  ngOnInit(): void {
    this.setDefaultAuthenticationMethod();
  }

  setDefaultAuthenticationMethod(): void {
    this.setLoginAuthenticationMethod();
  }

  onChangeAuthenticationMethod(): void {
    if (this.authenticationMethod === 'login')
      this.setRegisterAuthenticationMethod();
    else this.setLoginAuthenticationMethod();
  }

  setLoginAuthenticationMethod(): void {
    this.authenticationMethod = 'login';
  }

  setRegisterAuthenticationMethod(): void {
    this.authenticationMethod = 'register';
  }
}
