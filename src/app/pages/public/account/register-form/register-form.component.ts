import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectModel } from 'src/app/shared/components/ion-components/select/select.model';
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
  roles: SelectModel[];
  registerForm: FormGroup;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.initializeRoles();
    this.initializeForm();
  }

  //#region form
  initializeRoles(): void {
    this.roles = [
      new SelectModel(1, 'Recruiter'),
      new SelectModel(2, 'Seeker'),
    ];
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

  isFormValid(): boolean {
    const validForm: boolean = this.registerForm.valid;
    if (!validForm) this.onShowError('ERROR.ERR_10');
    return validForm;
  }

  getControl(control: string): FormControl {
    return this.registerForm.get(control) as FormControl;
  }
  //#endregion form

  onSubmit(): void {
    const isValid = this.isFormValid();
    if (!isValid) return;
    const register: Register = this.mapUserFromForm();
    this.onLogin(register);
  }

  onLogin(register: Register): void {
    this.onShowLoading();
    this.authService.register(register).subscribe({
      next: (res) => this.onLoginRes(res),
      error: (e) => this.onLoginError(e),
    });
  }

  //#region callbacks
  onLoginRes(response: any) {
    const { access_token } = response;
    this.saveAccesstokenInStorage(access_token);
    this.onDismissLoading();
  }

  onLoginError(errorMsg: string) {
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

  navigateToPrivateModule(): void {
    this.dynamicComponentsService.navigateRoot('/jobs');
  }

  onShowError(errorMsg: any): void {
    this.onDismissLoading();
    this.dynamicComponentsService.showTranslatedToast(errorMsg);
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
