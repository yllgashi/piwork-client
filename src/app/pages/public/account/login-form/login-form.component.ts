import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/shared/model/login.model';
import { AuthService } from 'src/app/shared/providers/auth.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { StorageService } from 'src/app/shared/providers/native/storage.service';

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

  //#region form
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

  isFormValid(): boolean {
    const validForm: boolean = this.loginForm.valid;
    if (!validForm) this.onShowError('ERROR.ERR_10');
    return validForm;
  }

  getControl(control: string): FormControl {
    return this.loginForm.get(control) as FormControl;
  }
  //#endregion form

  onSubmit(): void {
    const isValid = this.isFormValid();
    if (!isValid) return;
    const login: Login = this.loginForm.value;
    this.onLogin(login);
  }

  onLogin(login: Login): void {
    this.onShowLoading();
    this.authService.login(login).subscribe({
      next: (res) => this.onLoginRes(res),
      error: (e) => this.onLoginError(e),
    });
  }

  //#region callbacks
  onLoginRes(response: any) {
    const { access_token } = response;
    this.saveAccesstokenInStorage(access_token);
  }

  onLoginError(errorMsg: string): void {
    this.onDismissLoading();
    this.onShowError(errorMsg);
  }
  //#endregion callbacks

  saveAccesstokenInStorage(accessToken: string): void {
    this.storageService.set('accessToken', accessToken).subscribe({
      next: (res) => this.navigateToPrivateModule(),
      error: (e) => this.navigateToPrivateModule(),
    });
  }

  //#region helpers
  onShowError(errorMsg: any): void {
    this.dynamicComponentsService.showTranslatedToast(errorMsg);
  }

  navigateToPrivateModule(): void {
    this.dynamicComponentsService.navigateRoot('/jobs');
  }
  //#endregion helpers

  //#region loadings
  onShowLoading(): void {
    this.isLoading = true;
  }

  onDismissLoading(): void {
    this.isLoading = false;
  }
  //#endregion loadings
}
