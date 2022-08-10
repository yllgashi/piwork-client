import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Register } from 'src/app/shared/model/register.model';
import { AuthService } from 'src/app/shared/providers/auth.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { StorageService } from 'src/app/shared/providers/native/storage.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
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
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      description: new FormControl(null, Validators.required),
      roleId: new FormControl(null, Validators.required),
    });
  }

  getControl(control: string): FormControl {
    return this.registerForm.get(control) as FormControl;
  }

  onSubmit(): void {
    const isValid = this.isFormValid();
    if (!isValid) return;
    this.onLogin();
  }

  isFormValid(): boolean {
    const validForm: boolean = this.registerForm.valid;
    if (!validForm) this.onShowError('ERROR.ERR_10');
    return validForm;
  }

  onLogin(): void {
    this.onShowLoading();
    const register: Register = this.mapUserFromForm();
    this.authService.register(register).subscribe({
      next: (res) => this.onLoginFormSuccess(res),
      error: (e) => this.onShowError(e),
    });
  }

  mapUserFromForm(): Register {
    const { firstName, lastName, email, password, description, roleId } =
      this.registerForm.value;
    const register: Register = {
      firstName,
      lastName,
      email,
      password,
      description,
      roleId: +roleId,
    };
    return register;
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
    this.dynamicComponentsService.showTranslatedToast(errorMsg);
  }

  onShowLoading(): void {
    this.isLoading = true;
  }

  onDismissLoading(): void {
    this.isLoading = false;
  }
  //#endregion helpers
}
