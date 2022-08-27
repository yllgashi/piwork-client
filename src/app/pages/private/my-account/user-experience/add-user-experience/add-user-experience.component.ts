import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/shared/model/experience.model';
import { AccountService } from 'src/app/shared/providers/account.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';

@Component({
  selector: 'app-add-user-experience',
  templateUrl: './add-user-experience.component.html',
  styleUrls: ['./add-user-experience.component.scss'],
})
export class AddUserExperienceComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;

  constructor(
    private accountService: AccountService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  //#region form
  initializeForm(): void {
    this.form = new FormGroup({
      workplaceName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
  }

  getControl(control: string): FormControl {
    return this.form.get(control) as FormControl;
  }
  //#endregion form

  onSubmit(): void {
    this.initializeDefaultDates();
    this.onShowLoading();
    const experience: Experience = this.createExperienceModel();
    this.createUserExperience(experience);
  }

  createUserExperience(experience: Experience): void {
    this.accountService.createUserExperience(experience).subscribe({
      next: (res) => this.onCreateUserExperienceRes(res),
      error: (e) => this.onCreateUserExperienceError(e),
    });
  }

  //#region callbacks
  onCreateUserExperienceRes(response: any): void {
    this.onDismissLoading();
    this.closeModal();
  }

  onCreateUserExperienceError(error: string): void {
    this.onDismissLoading();
  }
  //#endregion callbacks

  //#region helpers
  createExperienceModel(): Experience {
    const { workplaceName, description, startDate, endDate } = this.form.value;
    const experience: Experience = {
      workplaceName,
      description,
      startDate,
      endDate,
    };
    return experience;
  }

  initializeDefaultDates(): void {
    const today: Date = new Date();
    this.form.controls.startDate.setValue(today);
  }

  closeModal(): void {
    this.dynamicComponentsService.closeModal();
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
