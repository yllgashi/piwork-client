import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/shared/model/login.model';
import { AuthService } from 'src/app/shared/providers/auth.service';
import { DynamicComponentsService } from 'src/app/shared/providers/dynamic-components.service';
import { StorageService } from 'src/app/shared/providers/storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    });
  }

  getControl(control: string): FormControl {
    return this.loginForm.get(control) as FormControl;
  }

  onSubmit(): void {
    const isValid = this.isFormValid();
    if (!isValid) return;
    this.onLogin();
  }

  isFormValid(): boolean {
    const validForm: boolean = this.loginForm.valid;
    if (!validForm) this.onShowError('Invalid form');
    return validForm;
  }

  onLogin(): void {
    this.onShowLoading();
    const login: Login = this.loginForm.value;
    this.authService.login(login).subscribe({
      next: (res) => this.onLoginFormSuccess(res),
      error: (e) => this.onShowError(e),
    });
  }

  onLoginFormSuccess(response: any) {
    const { access_token } = response;
    this.saveAccesstokenInStorage(access_token);
  }

  saveAccesstokenInStorage(accessToken: string): void {
    this.storageService.set('accessToken', accessToken).subscribe({
      next: (res) => this.navigateToPrivateModule(),
      error: (e) => this.navigateToPrivateModule(),
    });
  }

  navigateToPrivateModule(): void {
    this.dynamicComponentsService.navigateRoot('/overview');
  }

  //#region helpers
  onShowError(errorMsg: any): void {
    this.onDismissLoading();
    this.dynamicComponentsService.showToast(errorMsg);
  }

  onShowLoading(): void {
    this.isLoading = true;
  }

  onDismissLoading(): void {
    this.isLoading = false;
  }
  //#endregion helpers
}
