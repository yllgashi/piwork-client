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

  initializeForm(): void {
    this.newApplicationForm = new FormGroup({
      jobId: new FormControl(this.jobId, Validators.required),
      comment: new FormControl(null, Validators.required),
    });
  }

  getControl(control: string): FormControl {
    return this.newApplicationForm.get(control) as FormControl;
  }

  onSubmit(): void {
    const isValid = this.isFormValid();
    if (!isValid) return;
    this.onCreateApplication();
  }

  isFormValid(): boolean {
    const validForm: boolean = this.newApplicationForm.valid;
    if (!validForm) this.onShowError('ERROR.ERR_10');
    return validForm;
  }

  onCreateApplication(): void {
    this.onShowLoading();
    const application: CreateApplication = this.mapApplicationFromForm();
    this.applicationService.createApplication(application).subscribe({
      next: (_) => this.onCreateApplicationResponse(_),
      error: (e) => this.onShowError(e),
    });
  }

  onCreateApplicationResponse(response: any): void {
    this.dynamicComponentsService.showAlert({
      header: 'Success',
    });
    this.closeModal();
  }

  //#region helpers
  mapApplicationFromForm(): CreateApplication {
    const { jobId, comment } = this.newApplicationForm.value;
    const application: CreateApplication = {
      jobId: +jobId,
      comment,
    };
    return application;
  }

  closeModal(): void {
    this.dynamicComponentsService.closeModal();
  }

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
