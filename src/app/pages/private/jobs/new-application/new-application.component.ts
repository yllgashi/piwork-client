import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateApplication } from 'src/app/shared/model/create-application.model';
import { User } from 'src/app/shared/model/user.model';
import { ApplicationService } from 'src/app/shared/providers/application.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { UserService } from 'src/app/shared/providers/user.service';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss'],
})
export class NewApplicationComponent implements OnInit {
  @Input('jobId') jobId: number;
  @Input('jobTitle') jobTitle: string;
  newApplicationForm: FormGroup;
  user: User;
  isLoading: boolean;

  constructor(
    private userService: UserService,
    private applicationService: ApplicationService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.fetchUser();
    this.initializeForm();
  }

  fetchUser(): void {
    this.user = this.userService.user$.getValue();
  }

  //#region form
  initializeForm(): void {
    this.newApplicationForm = new FormGroup({
      jobId: new FormControl(this.jobId, Validators.required),
      comment: new FormControl(null, Validators.required),
    });
  }

  isFormValid(): boolean {
    const validForm: boolean = this.newApplicationForm.valid;
    if (!validForm) this.onShowError('ERROR.ERR_10');
    return validForm;
  }

  getControl(control: string): FormControl {
    return this.newApplicationForm.get(control) as FormControl;
  }
  //#endregion form

  onSubmit(): void {
    const isValid = this.isFormValid();
    if (!isValid) return;
    const application: CreateApplication = this.mapApplicationFromForm();
    this.onCreateApplication(application);
  }

  onCreateApplication(application: CreateApplication): void {
    this.onShowLoading();
    this.applicationService.createApplication(application).subscribe({
      next: (_) => this.onCreateApplicationRes(_),
      error: (e) => this.onCreateApplicationError(e),
    });
  }

  //#region callbacks
  onCreateApplicationRes(response: any): void {
    this.showSuccessAlert();
    this.closeModal();
  }

  onCreateApplicationError(errorMsg: string): void {
    this.onDismissLoading();
    this.onShowError(errorMsg);
  }
  //#endregion callbacks

  //#region helpers
  mapApplicationFromForm(): CreateApplication {
    const { jobId, comment } = this.newApplicationForm.value;
    const application: CreateApplication = {
      jobId: +jobId,
      comment,
    };
    return application;
  }

  showSuccessAlert(): void {
    this.dynamicComponentsService.showAlert({
      header: 'Success',
    });
  }

  closeModal(): void {
    this.dynamicComponentsService.closeModal();
  }

  onShowError(errorMsg: any): void {
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
